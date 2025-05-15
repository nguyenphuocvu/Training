import { Button, Input } from "antd";

const CityForm = ({ city, setCity, onSubmit, submitLabel, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-form">
      <Input
        type="text"
        name="rank"
        placeholder="Rank"
        value={city.rank}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="city"
        placeholder="City"
        value={city.city}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="state"
        placeholder="State"
        value={city.state}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="latitude"
        placeholder="Latitude"
        value={city.latitude}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="longitude"
        placeholder="Longitude"
        value={city.longitude}
        onChange={handleChange}
      />
      <Button type="button" onClick={onSubmit}>
        {submitLabel}
      </Button>
      <Button type="default" onClick={onCancel}>
        Hủy
      </Button>
    </div>
  );
};

export default CityForm;
