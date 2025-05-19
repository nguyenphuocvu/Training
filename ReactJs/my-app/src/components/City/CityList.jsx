import { useEffect, useState, useMemo } from "react";
import CityItem from "./CityItem";
import CityForm from "./CityForm";
import { useCityContext } from "./CityContext";
import { Form, Button, Input, Pagination } from "antd";
import "./index.css";

const CityList = () => {
  const { cities, addCity } = useCityContext();

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
  const citiesPerPage = 18;

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const displayedCities = useMemo(() => {
    return searchTerm ? filteredCities : cities;
  }, [searchTerm, filteredCities, cities]);

  const currentCities = useMemo(() => {
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    return displayedCities.slice(indexOfFirstCity, indexOfLastCity);
  }, [displayedCities, currentPage, citiesPerPage]);

  const handleAddNew = () => {
    if (
      newCity.rank &&
      newCity.city &&
      newCity.state &&
      newCity.latitude &&
      newCity.longitude
    ) {
      addCity(newCity);
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

  const leftCities = currentCities.slice(0, 9);
  const rightCities = currentCities.slice(9, 18);

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
          <div className="suggestion-lists">
            <ul className="suggestions">
              {leftCities.map((city) => (
                <CityItem key={`left-${city.rank}`} city={city} />
              ))}
            </ul>
            <ul className="suggestions">
              {rightCities.map((city) => (
                <CityItem key={`right-${city.rank}`} city={city} />
              ))}
            </ul>
          </div>

          <Pagination
            style={{ marginTop: "20px", textAlign: "center" }}
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
