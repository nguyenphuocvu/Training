Giống useState nhưng cũng cho phép bạn sử dụng logic cập nhật trạng thái của riêng mình
const [state , dispatch] = useReduce(updateCount , {count: 0});
const updateCount = (state, action) => {
    switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count : state.count - 1};
        default: 
          throw new Error()
    }
}



// import { useEffect, useReducer, useState } from "react";
// import CityItem from "./CityItem";
// import CityForm from "./CityForm";
// import { Form, Button, Input } from "antd";
// import "./index.css";


// const cityReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CITIES":
//       return action.payload;
//     case "ADD_CITY":
//       return [action.payload, ...state];
//     case "DELETE_CITY":
//       return state.filter((city) => parseInt(city.rank) !== parseInt(action.payload));
//     case "UPDATE_CITY":
//       return state.map((city) =>
//         city.rank === action.payload.rank ? action.payload : city
//       );
//     default:
//       return state;
//   }
// };

// const CityList = () => {
//   const [cities, dispatch] = useReducer(cityReducer, []);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFocus, setIsFocus] = useState(false);
//   const [isAddForm, setIsAddForm] = useState(false);
//   const [newCity, setNewCity] = useState({
//     rank: "",
//     city: "",
//     state: "",
//     latitude: "",
//     longitude: "",
//   });

//   useEffect(() => {
//     fetch("/cities.json")
//       .then((res) => res.json())
//       .then((data) => dispatch({ type: "SET_CITIES", payload: data }));
//   }, []);

//   const handleAddNew = () => {
//     if (newCity.rank && newCity.city && newCity.state && newCity.latitude && newCity.longitude) {
//       dispatch({ type: "ADD_CITY", payload: newCity });
//       setNewCity({
//         rank: "",
//         city: "",
//         state: "",
//         latitude: "",
//         longitude: "",
//       });
//       setIsAddForm(false);
//       setIsFocus(true);
//     }
//   };

//   const handleDelete = (rank) => {
//     dispatch({ type: "DELETE_CITY", payload: rank });
//   };

//   const handleSave = (updatedCity) => {
//     dispatch({ type: "UPDATE_CITY", payload: updatedCity });
//   };

//   const filteredCities = cities.filter((city) =>
//     city.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Form className="search-form" onSubmit={(e) => e.preventDefault()}>
//       <Form.Item>
//         <div className="flex items-center gap-2">
//           <Button
//             className="add-form"
//             type="button"
//             onClick={() => setIsAddForm(!isAddForm)}
//           >
//             +
//           </Button>
//           <Input
//             type="text"
//             className="search"
//             placeholder="City or State"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={() => setIsFocus(true)}
//           />
//         </div>
//       </Form.Item>

//       {isAddForm && (
//         <CityForm
//           city={newCity}
//           setCity={setNewCity}
//           onSubmit={handleAddNew}
//           submitLabel="Thêm"
//         />
//       )}

//       {isFocus && (
//         <ul className="suggestions">
//           {(searchTerm ? filteredCities : cities).map((city) => (
//             <CityItem key={city.rank} city={city} onDelete={handleDelete} onSave={handleSave} />
//           ))}
//         </ul>
//       )}
//     </Form>
//   );
// };

// export default CityList;
