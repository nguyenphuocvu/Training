"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Pagination } from "antd";
import CityForm from "../CityForm/CityForm";
import CityItem from "./CityItem";
import useCityRedux from "@/hooks/useCityRedux";
import { City } from "@/types";
type Props = {
  group: string;
};

const CitySection = ({ group }: Props) => {
  const { cities, fetchCities, addCity } = useCityRedux(group);

  useEffect(() => {
    fetchCities();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAddForm, setIsAddForm] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [newCity, setNewCity] = useState<City>({
    rank: 0, 
    city: "",
    state: "",
    latitude: 0, 
    longitude: 0, 
  });
  const citiesPerPage = 9;

  const filteredCities = useMemo(() => {
    if (!Array.isArray(cities)) return [];
    return cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const displayedCities = useMemo(() => {
    if (!Array.isArray(cities)) return [];
    return searchTerm ? filteredCities : cities;
  }, [searchTerm, filteredCities, cities]);

  const currentCities = useMemo(() => {
    if (!Array.isArray(displayedCities)) return [];
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    return displayedCities.slice(indexOfFirstCity, indexOfLastCity);
  }, [displayedCities, currentPage, citiesPerPage]);

  const handlePageChange = (page: number) => {
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


      addCity(newCity);

      setNewCity({
        rank: 0,
        city: "",
        state: "",
        latitude: 0,
        longitude: 0, 
      });
      setIsAddForm(false);
      setIsFocus(true);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      const formWrapper = document.querySelector(".add-form-wrapper");
      if (formWrapper && !formWrapper.contains(e.target as Node)) {// as Node
        setIsFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);
  return (
    <Form>
      <div>
        <div>
          <Button
            className="add-form"
            htmlType="button"
            onClick={() => setIsAddForm(!isAddForm)}
          >
            +
          </Button>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="City or State"
            value={searchTerm}
            onFocus={() => setIsFocus(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {isAddForm && (
        <div className="add-form-wrapper">
          <CityForm
            city={newCity}
            setCity={setNewCity}
            onSubmit={handleAddNew}
            submitLabel="Thêm"
            onCancel={() => setIsAddForm(false)}
          />
        </div>
      )}

      {isFocus && (
        <>
          <ul>
            {currentCities.map((city) => (
              <CityItem key={city.rank} city={city} group={group} />
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
