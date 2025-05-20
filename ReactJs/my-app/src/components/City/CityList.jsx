import React from "react";
import CitySection from "./CitySection";
import { useCityContext } from "./CityContext";
import "./index.css";

const CityList = () => {
  const {  leftCities, rightCities, addCity } = useCityContext();

  return (
    <div className="flex gap-5">
      <div className="w-1/2">
        <CitySection
          cities={leftCities}
          addCity={(city) => addCity( city,  "left" )}
          group="left"
        />
      </div>
      <div className="w-1/2">
        <CitySection
          cities={rightCities}
          addCity={(city) => addCity(city, "right")}
          group="right"
        />
      </div>
    </div>
  );
};

export default CityList;
