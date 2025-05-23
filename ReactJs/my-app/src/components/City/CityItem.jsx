import React, { useEffect, useState } from "react";
import CityForm from "./CityForm";
import { Button, Input } from "antd";
import { useCityContext } from "./CityContext";

const CityItem = ({ city, group }) => {
const {deleteCity , updateCity } = useCityContext()

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...city });

  useEffect(() => {
    if (!isEditing) {
      setFormData({ ...city });
    }
  }, [isEditing, city]);

  const handleSave = () => {
    updateCity(formData, group);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const formWrapper = document.querySelector(".edit-form-wrapper");
      if (formWrapper && !formWrapper.contains(e.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
          <Input className="edit-city" value={city.city} readOnly />
          <Button type="default" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
          <Button type="default" onClick={() =>deleteCity(city.rank, group )}>
            Xóa
          </Button>
        </>
      ) : (
        <div className="edit-form-wrapper">
          <CityForm 
            city={formData}
            setCity={setFormData}
            onSubmit={handleSave}
            submitLabel="Lưu"
            onCancel={handleCancel}
          />
        </div>
      )}
    </li>
  );
};


export default React.memo(CityItem);
