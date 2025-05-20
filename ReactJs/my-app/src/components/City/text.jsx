import React, { useMemo, useState, useEffect } from "react";
import { Button, Input, Pagination } from "antd";
import CityItem from "./CityItem";
import CityForm from "./CityForm";

const CitySection = ({ title, cities, addCity }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [newCity, setNewCity] = useState({
    rank: "", city: "", state: "", latitude: "", longitude: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 9;

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const currentCities = useMemo(() => {
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    return filteredCities.slice(indexOfFirstCity, indexOfLastCity);
  }, [filteredCities, currentPage]);

  const handleAddNew = () => {
    if (Object.values(newCity).every((val) => val)) {
      addCity(newCity);
      setNewCity({ rank: "", city: "", state: "", latitude: "", longitude: "" });
      setIsAddForm(false);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const wrapper = document.querySelector(`.add-form-wrapper-${title}`);
      if (wrapper && !wrapper.contains(e.target)) setIsAddForm(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title]);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title}</h2>
      <div className="flex items-center gap-2">
        <Button onClick={() => setIsAddForm(!isAddForm)}>+</Button>
        <Input
          placeholder="Tìm kiếm city"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          onFocus={() => setIsFocus(true)}
        />
      </div>

      {isAddForm && (
        <div className={`add-form-wrapper-${title}`}>
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
              <CityItem key={city.rank} city={city} />
            ))}
          </ul>
          <Pagination
            current={currentPage}
            pageSize={citiesPerPage}
            total={filteredCities.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </>
      )}
    </div>
  );
};

export default CitySection;
