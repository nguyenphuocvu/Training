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
  const [isCities, setIsCities] = useState({});

  const addList = useCallback((name) => {
    setIsCities((prev) => ({
      ...prev,
      [name]: [],
    }));
  }, []);

  const addCity = (newCity, group) => {
    setIsCities((prev) => ({
      ...prev,
      [group]: [newCity, ...prev[group]],
    }));
  };

  const deleteCity = useCallback((rank, group) => {
    setIsCities((prev) => ({
      ...prev,
      [group]: prev[group].filter(
        (city) => parseInt(city.rank) !== parseInt(rank)
      ),
    }));
  }, []);
  const updateCity = useCallback((updateCity, group) => {
    setIsCities((prev) => ({
      ...prev,
      [group]: prev[group].map((city) =>
        city.rank === updateCity.rank ? updateCity : city
      ),
    }));
  }, []);

  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => {
        setIsCities(data);
      });
  }, []);
  return (
    <CityContext.Provider
      value={{
        isCities,
        addCity,
        deleteCity,
        updateCity,
        addList,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
