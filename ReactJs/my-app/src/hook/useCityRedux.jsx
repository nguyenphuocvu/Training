import { useSelector, useDispatch } from "react-redux";
import {
  fetchCities,
  addCity,
  deleteCity,
  updateCity,
} from "../store/citySlice";

const useCityRedux = (group) => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities[group] || []);

  return {
    cities,
    fetchCities: () => dispatch(fetchCities(group)),
    addCity: (city) => dispatch(addCity({ group, city })),
    deleteCity: (rank) => dispatch(deleteCity({ group, rank })),
    updateCity: (city) => dispatch(updateCity({ group, city })),
  };
};

export default useCityRedux;
