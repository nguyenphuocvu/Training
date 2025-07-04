"use client";

import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CityForm from "../CityForm/CityForm";
import useCityRedux from "@/hooks/useCityRedux";
import useClickOutSide from "@/hooks/useClickOutSide";
import { City } from "@/types";
import socket from "@/utils/socket";
interface CityItemProps {
  city: City;
  group: string;
}
const CityItem = ({ city, group }: CityItemProps) => {
  const { deleteCity, updateCity } = useCityRedux(group);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = (data: City) => {
    updateCity(data);
    setIsEditing(false);
    socket.emit("edit-city" , {roomId: group, city: data});
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  //Socket.on Edit City
  useEffect(() => {
    const handleCityEdited = (editedCity: City) => {
      updateCity(editedCity);
    };
  
    socket.on("city-edited", handleCityEdited);
  
    return () => {
      socket.off("city-edited", handleCityEdited); 
    };
  }, []);
  
  useClickOutSide(isEditing, setIsEditing);

  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
          <input
            className="box-border m-0 px-[11px] py-[4px] text-[rgba(0,0,0,0.88)] text-sm leading-[1.5714] list-none font-sans relative inline-block w-[200px] min-w-0 rounded-[6px] transition-all duration-200"
            readOnly
            value={city.city}
          />
          <Button type="default" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button type="default" onClick={() => deleteCity(city.rank)}>
            Delete
          </Button>
        </>
      ) : (
        <div className="edit-form-wrapper">
          <CityForm
            initialValues={city}
            onSubmit={handleSave}
            onCancel={handleCancel}
            submitLabel="Lưu"
          />
        </div>
      )}
    </li>
  );
};

export default React.memo(CityItem);
