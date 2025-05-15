import { useEffect, useState } from "react";
import CityItem from "./CityItem";
import CityForm from "./CityForm";
import { Form, Button, Input, Pagination } from "antd";
import "./index.css";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [newCity, setNewCity] = useState({
    rank: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 9;
  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCities = searchTerm ? filteredCities : cities;

  const indexOfLastCity = currentPage * citiesPerPage;

  const indexOfFirstCity = indexOfLastCity - citiesPerPage;

  const currentCities = displayedCities.slice(
    indexOfFirstCity,
    indexOfLastCity
  );

  const handleDelete = (rank) => {
    setCities((prev) =>
      prev.filter((city) => parseInt(city.rank) !== parseInt(rank))
    );
  };

  const handleSave = (updatedCity) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.rank === updatedCity.rank ? updatedCity : city
      )
    );
  };

  const handleAddNew = () => {
    if (
      newCity.rank &&
      newCity.city &&
      newCity.state &&
      newCity.latitude &&
      newCity.longitude
    ) {
      setCities((prev) => [newCity, ...prev]);
      setNewCity({
        rank: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
      });
      setIsAddForm(false);
      setIsFocus(true);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const formWrapper = document.querySelector(".add-form-wrapper");
      if (formWrapper && !formWrapper.contains(e.target)) {
        setIsAddForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <Form.Item>
        <div className="flex items-center gap-2">
          <Button
            className="add-form"
            type="button"
            onClick={() => setIsAddForm(!isAddForm)}
          >
            +
          </Button>

          <Input
            type="text"
            className="search"
            placeholder="City or State"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onFocus={() => setIsFocus(true)}
          />
        </div>
      </Form.Item>

     
      {isAddForm && (
        <div className="add-form-wrapper">
          <CityForm
            city={newCity}
            setCity={setNewCity}
            onSubmit={handleAddNew}
            submitLabel="Thêm"
          />
        </div>
      )}

      {isFocus && (
        <>
          <ul className="suggestions">
            {currentCities.map((city) => (
              <CityItem
                key={city.rank}
                city={city}
                onDelete={handleDelete}
                onSave={handleSave}
              />
            ))}
          </ul>

          <Pagination
            style={{ marginTop: "800px" }}
            onChange={handlePageChange}
            current={currentPage}
            pageSize={citiesPerPage}
            total={displayedCities.length}
          />
        </>
      )}
    </Form>
  );
};

export default CityList;
