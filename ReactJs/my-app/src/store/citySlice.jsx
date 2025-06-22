import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (group) => {
    const response = await fetch("/cities.json");
    const data = await response.json();
    return { group, cities: data };
  }
);


const citySlice = createSlice({
  name: "cities",
  initialState: {
    cities: {},
  },
  reducers: {
    addCity: (state, action) => {
      const { group, city } = action.payload;
      if (!state.cities[group]) {
        state.cities[group] = [];
      }
      state.cities[group].unshift(city);
    },
    deleteCity: (state, action) => {
      const { group, rank } = action.payload;
      if (state.cities[group]) {
        state.cities[group] = state.cities[group].filter(
          (city) => city.rank !== rank
        );
      }
    },
    updateCity: (state, action) => {
      const { group, city } = action.payload;
      if (state.cities[group]) {
        state.cities[group] = state.cities[group].map((c) =>
          c.rank === city.rank ? city : c
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      const { group, cities } = action.payload;
      if (!state.cities[group]) {
        state.cities[group] = [];
      }
      state.cities[group] = cities;
    });
  },
});

export const { addCity, deleteCity, updateCity } = citySlice.actions;
export default citySlice.reducer;
