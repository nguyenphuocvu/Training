import { useSelector, useDispatch } from "react-redux";
import { fetchCities, addCity, deleteCity, updateCity } from "@/redux/features/citySlice";
import type { RootState, AppDispatch } from "@/redux/store"; 
import { City } from "@/types";

const useCityRedux = (group: string) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const cities = useSelector((state: RootState) => state.cities.cities[group] || []);

  return {
    cities,
    fetchCities: () => dispatch(fetchCities(group)), 
    addCity: (city: City) => dispatch(addCity({ group, city })),
    deleteCity: (rank: number) => dispatch(deleteCity({ group, rank })),
    updateCity: (city: City) => dispatch(updateCity({ group, city })),
  };
};

export default useCityRedux;

