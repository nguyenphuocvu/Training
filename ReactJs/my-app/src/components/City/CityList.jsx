import { useEffect, useState } from "react";
import CityItem from "./CityItem";
import CityForm from "./CityForm";
import "./index.css";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [newCity, setNewCity] = useState({
    rank: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (rank) => {
    setCities((prev) =>
      prev.filter((city) => parseInt(city.rank) !== parseInt(rank))
    );
  };

  const handleSave = (updatedCity) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.rank === updatedCity.rank ? updatedCity : city
      )
    );
  };

  const handleAddNew = () => {
    if (
      newCity.rank &&
      newCity.city &&
      newCity.state &&
      newCity.latitude &&
      newCity.longitude
    ) {
      setCities((prev) => [newCity, ...prev]);
      setNewCity({
        rank: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
      });
      setIsAddForm(false);
      setIsFocus(true);
    }
  };

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <div className="all-citylist">
        <button
          className="add-form"
          type="button"
          onClick={() => setIsAddForm(!isAddForm)}
        >
          +
        </button>
        <input
          type="text"
          className="search"
          placeholder="City or State"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocus(true)}
        />
      </div>

      {isAddForm && (
        <CityForm
          city={newCity}
          setCity={setNewCity}
          onSubmit={handleAddNew}
          submitLabel="Thêm"
        />
       
      )}
      {isFocus && (
        <ul className="suggestions">
          {(searchTerm ? filteredCities : cities).map((city) => (
            <CityItem
              key={city.rank}
              city={city}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          ))}
        </ul>
      )}
    </form>
  );
};

export default CityList;
