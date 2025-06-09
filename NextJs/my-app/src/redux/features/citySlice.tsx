import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { City } from "@/types";
// City type

interface CityState {
  cities: {
    [group: string]: City[];
  };
}

interface FetchCitiesPayload {
  group: string;
  cities: City[];
}

const initialState: CityState = {
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
    addCity: (
      state,
      action: PayloadAction<{ group: string; city: City }>
    ) => {
      const { group, city } = action.payload;
      if (!state.cities[group])
      state.cities[group] = [];
      state.cities[group].unshift(city);
    },
    deleteCity: (state, action: PayloadAction<{ group: string; rank: number }>) => {
      const { group, rank } = action.payload;
      if (!state.cities[group]) return;
      state.cities[group] = state.cities[group].filter((c) => c.rank !== rank);
    },
    updateCity: (state, action: PayloadAction<{ group: string; city: City }>) => {
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

export const { addCity, deleteCity, updateCity } = citySlice.actions;
export default citySlice.reducer;


