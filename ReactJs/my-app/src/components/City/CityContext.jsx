import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CityContext = createContext();

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  const addCity = (newCity) => {
    setCities((prev) => [newCity, ...prev]);
  };

  const deleteCity = useCallback((rank) => {
    setCities((prev) =>
      prev.filter((city) => parseInt(city.rank) !== parseInt(rank))
    );
  }, []);

  const updateCity = useCallback((updatedCity) => {
    setCities((prev) =>
      prev.map((city) => (city.rank === updatedCity.rank ? updatedCity : city))
    );
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        addCity,
        deleteCity,
        updateCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
