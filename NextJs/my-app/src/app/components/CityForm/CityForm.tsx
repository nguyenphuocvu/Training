import React from "react";
import { Button } from "antd";
import "@/styles/CityForm.css";
import { City } from "@/types";

type CityFormProps = {
  city: City;
  setCity: React.Dispatch<React.SetStateAction<City>>;
  onSubmit: () => void;
  submitLabel: string;
  onCancel: () => void;
};
const CityForm = ({
  city,
  setCity,
  onSubmit,
  submitLabel,
  onCancel,
}: CityFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCity((prev) => ({ ...prev, [name]: value }));
      };
      
  return (
    <div className="add-form">
      <input
        type="text"
        name="rank"
        placeholder="Rank"
        className="input-form"
        onChange={handleChange}
        value={city.rank}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        className="input-form"
        onChange={handleChange}
        value={city.city}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        className="input-form"
        onChange={handleChange}
        value={city.state}
      />
      <input
        type="text"
        name="latitude"
        placeholder="Latitude"
        className="input-form"
        onChange={handleChange}
        value={city.latitude}
      />
      <input
        type="text"
        name="longitude"
        placeholder="Longitude"
        className="input-form"
        onChange={handleChange}
        value={city.longitude}
      />

      <div className="button-group">
        <Button type="primary" onClick={onSubmit}>
            {submitLabel}
        </Button>
        <Button type="default"onClick={onCancel}>
            Hủy
        </Button>
      </div>
    </div>
  );
};

export default CityForm;
