import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import HomePage from "./pages/Home";
// import NewPage from "./pages/New";
import "./App.css";
import { Layout } from "antd";
import CityList from "./components/City/CityList";

const App = () => {
  return (
    <>
      {/* <Layout className="flex ">
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/city-list">City</Link>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/city-list" element={<CityList />} />
        </Routes>
      </Layout> */}
      <Layout>
        <CityList />
      </Layout>
    </>
  );
};

export default App;
