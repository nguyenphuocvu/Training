import { Button } from "antd";
import "./css/CityForm.css"; 

const CityForm = ({ city, setCity, onSubmit, submitLabel, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-form">
      <input
        type="text"
        name="rank"
        placeholder="Rank"
        value={city.rank}
        onChange={handleChange}
        className="input-form"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={city.city}
        onChange={handleChange}
        className="input-form"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={city.state}
        onChange={handleChange}
        className="input-form"
      />
      <input
        type="text"
        name="latitude"
        placeholder="Latitude"
        value={city.latitude}
        onChange={handleChange}
        className="input-form"
      />
      <input
        type="text"
        name="longitude"
        placeholder="Longitude"
        value={city.longitude}
        onChange={handleChange}
        className="input-form"
      />
      <div className="button-group">
        <Button type="primary" onClick={onSubmit}>
          {submitLabel}
        </Button>
        <Button type="default" onClick={onCancel}>
          Hủy
        </Button>
      </div>
    </div>
  );
};

export default CityForm;