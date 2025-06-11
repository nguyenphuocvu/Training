import { useSelector, useDispatch } from "react-redux";
import {
  fetchCities,
  addList,
  addCity,
  deleteCity,
  updateCity,
} from "@/redux/features/citySlice";
import type { RootState, AppDispatch } from "@/redux/store";
import { City } from "@/types";

const useCityRedux = (group?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.cities.groups);

  const cities = useSelector((state: RootState) =>
    group ? state.cities.cities[group] || [] : []
  );

  return {
    groups,
    cities,
    fetchCities: () => group && dispatch(fetchCities(group)),
    addList: (name: string) => dispatch(addList(name)),
    addCity: (city: City) => group && dispatch(addCity({ group, city })),
    deleteCity: (rank: number) => group && dispatch(deleteCity({ group, rank })),
    updateCity: (city: City) => group && dispatch(updateCity({ group, city })),
  };
};

export default useCityRedux;
