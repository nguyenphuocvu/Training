import React from "react";
import "./App.css";
import { Layout } from "antd";
import CityList from "./components/City/CityList";
const App = () => {
  return (
    <>
      <Layout>
        <CityList />
      </Layout>
    </>
  );
};

export default App;
