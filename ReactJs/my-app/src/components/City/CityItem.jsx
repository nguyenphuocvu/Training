import React, { useEffect, useState } from "react";
import CityForm from "./CityForm";
import { Button, Input } from "antd";
import useClickOutSide from "../../hook/useClickOutSide";
import useCityRedux from "../../hook/useCityRedux";

const CityItem = ({ city, group }) => {
  const { deleteCity, updateCity } = useCityRedux();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...city });

  useEffect(() => {
    if (!isEditing) {
      setFormData({ ...city });
    }
  }, [isEditing, city]);

  const handleSave = () => {
    updateCity(group, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useClickOutSide(isEditing, setIsEditing);

  return (
    <li className="city-item" draggable="true">
      {!isEditing ? (
        <>
          <Input className="edit-city" value={city.city} readOnly />
          <Button type="default" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
          <Button type="default" onClick={() => deleteCity(group, city.rank)}>
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
