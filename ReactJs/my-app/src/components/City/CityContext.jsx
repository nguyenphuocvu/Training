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
  const [leftCities, setLeftCities] = useState([]);
  const [rightCities, setRightCities] = useState([]);

  useEffect(() => {
    fetch("/cities-left.json")
      .then((res) => res.json())
      .then((data) => setLeftCities(data));

    fetch("/cities-right.json")
      .then((res) => res.json())
      .then((data) => setRightCities(data));
  }, []);

  const addCity = (newCity, group) => {
    if (group === "left") {
      setLeftCities((prev) => [newCity, ...prev]);
    } else {
      setRightCities((prev) => [newCity, ...prev]);
    }
  };

  const deleteCity = useCallback((rank, group) => {
    if(group === "left"){
      setLeftCities((prev) => prev.filter((city) => parseInt(city.rank) !== parseInt(rank)))
    }
    else{
      setRightCities((prev) => prev.filter((city) => parseInt(city.rank) !== parseInt(rank)))
    }
  }, []);
  const updateCity = useCallback((updateCity, group) => {
    const updater = (prev) =>
      prev.map((city) =>
        city.rank === updateCity.rank ? updateCity : city
      );

    if (group === "left") { 
      setLeftCities(updater);
    } else {
      setRightCities(updater);
    }
  }, []);
  

  return (
    <CityContext.Provider
      value={{
        leftCities,
        rightCities,
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
