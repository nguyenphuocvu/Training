import { useSelector, useDispatch } from "react-redux";
import {
  fetchCities,
  addCity,
  deleteCity,
  updateCity,
} from "../redux/citySlice";

const useCityRedux = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);

  return {
    cities,
    fetchCities: (group) => dispatch(fetchCities(group)),
    addCity: (group, city) => dispatch(addCity({ group, city })),
    deleteCity: (group, rank) => dispatch(deleteCity({ group, rank })),
    updateCity: (group, city) => dispatch(updateCity({ group, city })),
  };
};

export default useCityRedux;
