import React from "react";
import CitySection from "./CitySection";
import { useCityContext } from "./CityContext";
import "./index.css";

const CityList = () => {
  const { isCities, addCity } = useCityContext();

  return (
    <div className="flex gap-5">
      <div className="w-1/2">
        <CitySection
          cities={isCities.left}
          addCity={(city) => addCity(city, "left")}
          group="left"
        />
      </div>
      <div className="w-1/2">
        <CitySection
          cities={isCities.right}
          addCity={(city) => addCity(city, "right")}
          group="right"
        />
      </div>
    </div>
  );
};

export default CityList;
