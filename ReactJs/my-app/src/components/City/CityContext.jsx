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
  const [isCities, setIsCities] = useState({
    left: [],
    right: [],
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const leftRes = await fetch("/cities-left.json");
        const leftCities = await leftRes.json();
  
        const rightRes = await fetch("/cities-right.json");
        const rightCities = await rightRes.json();
  
        setIsCities({ left: leftCities, right: rightCities });
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
  
    fetchCities();
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

  return (
    <CityContext.Provider
      value={{
        isCities,
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
