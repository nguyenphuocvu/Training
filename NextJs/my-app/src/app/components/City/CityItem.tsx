'use client'

import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import CityForm from "../CityForm/CityForm";
import useCityRedux from "@/hooks/useCityRedux";
import useClickOutSide from "@/hooks/useClickOutSide";
import { City } from "@/types";
interface CityItemProps {
  city: City ;
  group : string;
}
const CityItem = ({city , group} : CityItemProps) => {

  const {deleteCity , updateCity} = useCityRedux(group)
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData , setFormData] = useState<City>({...city})

  useEffect(() => {
    if(!isEditing){
      setFormData({...city})
    }
  }, [isEditing , city])

  const handleSave = () => {
    updateCity(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  useClickOutSide(isEditing, setIsEditing);


  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
          <Input 
             className="edit-city"
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
             city={formData}
             setCity={setFormData}
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