// import { create } from "zustand";

// const useCityStore = create((set) => ({
//      cities : [],

//      fetchCities: async() => {
//         const reponse = await fetch("/cities.json");
//         const data = await reponse.json();
//         set({ cities: data });
//      },
//      addCity: (newCity) => {
//         set((state) => ({
//             cities: [newCity, ...state.cities]
//         }))
//      },
//      deleteCity: (rank) => {
//         set((state) => ({
//             cities: state.cities.filter((city) => parseInt(city.rank) !== parseInt(rank))
//         }))
//      },
//      updateCity : (updateCity) => {
//         set((state) => ({
//             cities: state.cities.map((city) => (city.rank === updateCity.rank ? updateCity : city))
//         }))
//      }


// }));

// export default useCityStore;


