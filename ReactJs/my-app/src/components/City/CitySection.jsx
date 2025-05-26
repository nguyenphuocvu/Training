import React, { useEffect, useState, useMemo } from "react";
import { Button, Input, Pagination, Form } from "antd";
import CityItem from "./CityItem";
import CityForm from "./CityForm";

const CitySection = ({ cities, addCity, group }) => {
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

  const filteredCities = useMemo(() => {
    if (!Array.isArray(cities)) return [];
    return cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 9;

  const displayedCities = useMemo(() => {
    if (!Array.isArray(cities)) return [];
    return searchTerm ? filteredCities : cities;
  }, [searchTerm, filteredCities, cities]);

  const currentCities = useMemo(() => {
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    return displayedCities.slice(indexOfFirstCity, indexOfLastCity);
  }, [displayedCities, currentPage, citiesPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddNew = () => {
    if (
      newCity.rank &&
      newCity.city &&
      newCity.state &&
      newCity.latitude &&
      newCity.longitude
    ) {
      addCity({ ...newCity, group }, group);
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
    <Form className="search-form">
      <Form.Item>
        <div className="flex items-center gap-2">
          <Button
            className="add-form"
            type="button"
            onClick={() => setIsAddForm(!isAddForm)}
          >
            +
          </Button>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="text"
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
          <ul>
            {currentCities.map((city) => (
              <CityItem key={city.id} city={city} group={group} />
            ))}
          </ul>

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

export default CitySection;
