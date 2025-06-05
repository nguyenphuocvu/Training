import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query";

export const citiesApi = createApi({
    reducerPath: "citiesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: (group) => `cities/${group}`,
            transformResponse: (response) => response.cities,
        }), 
       
    }),
})