import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { City } from "@/types";
// City type
interface CityState {
  groups: string[];
  cities: {
    [group: string]: City[];
  };
}

interface FetchCitiesPayload {
  group: string;
  cities: City[];
}

const initialState: CityState = {
  groups:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("citiesGroup") || "[]")
      : [],
  cities: {},
};

export const fetchCities = createAsyncThunk<FetchCitiesPayload, string>(
  "cities/fetchCities",
  async (group) => {
    const response = await fetch("/cities.json");
    const data: City[] = await response.json();
    return { group, cities: data };
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      const listName = action.payload;
      if (!state.groups.includes(listName)) {
        state.groups.push(listName);
        localStorage.setItem("citiesGroup", JSON.stringify(state.groups));
      }
    },
    addCity: (state, action: PayloadAction<{ group: string; city: City }>) => {
      const { group, city } = action.payload;
      if (!state.cities[group]) state.cities[group] = [];
      state.cities[group].unshift(city);
    },
    deleteCity: (
      state,
      action: PayloadAction<{ group: string; rank: number }>
    ) => {
      const { group, rank } = action.payload;
      if (!state.cities[group]) return;
      state.cities[group] = state.cities[group].filter((c) => c.rank !== rank);
    },
    updateCity: (
      state,
      action: PayloadAction<{ group: string; city: City }>
    ) => {
      const { group, city } = action.payload;
      if (!state.cities[group]) return;
      state.cities[group] = state.cities[group].map((c) =>
        c.rank === city.rank ? city : c
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      const { group, cities } = action.payload;
      state.cities[group] = cities;
    });
  },
});

export const { addCity, addList, deleteCity, updateCity } = citySlice.actions;
export default citySlice.reducer;
