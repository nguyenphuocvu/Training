import React, { useEffect, useState } from "react";
import "./index.css";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editCityId, setEditCityId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (rank) => {
    setCities((prevCities) => {
      const index = prevCities.findIndex(
        (city) => parseInt(city.rank) === parseInt(rank)
      );
      if (index !== -1) {
        const newCities = [...prevCities];
        newCities.splice(index, 1);
        return newCities;
      }
      return prevCities;
    });
  };

  const handleEdit = (city) => {
    setEditCityId(city.rank);
    setEditFormData({
      city: city.city,
      state: city.state,
      latitude: city.latitude,
      longitude: city.longitude,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (rank) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.rank === rank ? { ...city, ...editFormData } : city
      )
    );
    setEditCityId(null);
  };

  const fetchCity = () => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  };

  useEffect(() => {
    fetchCity();
  }, []);

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="search"
        placeholder="City or State"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul className="suggestions">
          {filteredCities.map((city) => (
            <li key={city.rank} className="city-item" draggable="true">
              <input
                type="text"
                className="edit-city"
                value={city.city}
                disabled
              />

              <button
                className="edit-btn"
                type="button"
                onClick={() => {
                  handleEdit(city);
                }}
              >
                Chỉnh sửa
              </button>

              <button
                className="delete-btn"
                type="button"
                onClick={() => handleDelete(city.rank)}
              >
                Xóa
              </button>

              {/* Edit Form */}
              {editCityId  &&  (
                <div className="edit-form" data-rank={city.rank}   style={{ display: editCityId === city.rank ? "block" : "none" }}  >
                  <label>Tên thành phố:</label>
                  <input
                    type="text"
                    className="edit-city-name"
                    name="city"
                    value={editFormData.city}
                    onChange={handleChange}
                  />
                  <label>Bang:</label>
                  <input
                    type="text"
                    className="edit-state"
                    name="state"
                    value={editFormData.state}
                    onChange={handleChange}
                  />
                  <label>Vĩ độ:</label>
                  <input
                    type="text"
                    className="edit-lat"
                    name="latitude"
                    value={editFormData.latitude}
                    onChange={handleChange}
                  />
                  <label>Kinh độ:</label>
                  <input
                    type="text"
                    className="edit-long"
                    name="longitude"
                    value={editFormData.longitude}
                    onChange={handleChange}
                  />
                  <button
                    className="save-btn"
                    type="button"
                    onClick={() => handleSave(city.rank)}
                  >
                    Lưu
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default CityList;
