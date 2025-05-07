const CityForm = ({ city, setCity, onSubmit, submitLabel }) => {
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
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={city.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={city.latitude}
          onChange={handleChange}
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={city.longitude}
          onChange={handleChange}
        />
        <button type="button" onClick={onSubmit}>
          {submitLabel}
        </button>
      </div>
    );
  };
  
  export default CityForm;
  