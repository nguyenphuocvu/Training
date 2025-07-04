import AddList from "./AddCityForm/AddList";
import CitySection from "./CitySection";
import React, { useState } from "react";

const CityList = () => {
  const [lists, setLists] = useState([]);

  const handleAddList = (name) => {
    setLists((prev) => [...prev, name]);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <AddList onAdd={handleAddList} />

      <div className="flex flex-wrap gap-5 mt-5">
        {lists.map((name, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 w-full sm:w-[300px] flex flex-col"
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800">{name}</h2>

            <CitySection group={name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
