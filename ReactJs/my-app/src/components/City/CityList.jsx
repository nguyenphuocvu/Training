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

  // useEffect(() => {
  //   fetch("/cities.json")
  //     .then((res) => res.json())
  //     // .then((data) => setCities(data));
  // }, []);

  useEffect(() => {
    let isMounted = true;
  
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          if (isMounted) {
            setCities(data); 
          } else {
            console.warn("⛔ Component đã bị unmount, bỏ qua setCities");
          }
        }, 3000);
      });
  
    return () => {
      isMounted = false;
      console.log("🛑 CityList unmounted");
    };
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
        <CityForm
          city={newCity}
          setCity={setNewCity}
          onSubmit={handleAddNew}
          submitLabel="Thêm"
        />
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
