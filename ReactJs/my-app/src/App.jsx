// import "./App.css";
// // import TicketTable from "./components/CreateTicket/TicketTable";
// import { Layout } from "antd";
// import CityList from "./components/City/CityList";
// // import Content from "./Content";
// const App = () => {
//   return (
//     <>
//       <Layout className="h-screen select-none" >
//         {/* <TicketTable /> */}
//         <CityList />
//       </Layout>

//       {/* <Content /> */}
//     </>
//   );
// };

// export default App;
// import React from "react";
// import "./App.css";
// import { Layout } from "antd";
// import CityList from "./components/City/CityList";
// const App = () => {
//   return (
//     <>
//       <Layout>
//         <CityList />
//       </Layout>
//     </>
//   );
// };

// export default App;


import React, { useState } from "react";
import "./App.css";
import { Layout, Button } from "antd";
import CityList from "./components/City/CityList";

const App = () => {
  const [showCityList, setShowCityList] = useState(true);

  return (
    <Layout style={{ padding: "20px" }}>
      <Button onClick={() => setShowCityList(!showCityList)}>
        {showCityList ? "Ẩn CityList" : "Hiện CityList"}
      </Button>

      {/* Khi component bị ẩn thì nó sẽ unmount */}
      {showCityList && <CityList />}
    </Layout>
  );
};

export default App;

