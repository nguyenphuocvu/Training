import React from "react";
import "./App.css";
import { Layout } from "antd";
import CityList from "./components/City/CityList";
import CityProvider from "./components/City/CityContext"; 

const App = () => {
  return (
    <>
      <CityProvider>
        <Layout>
          <CityList />
        </Layout>
      </CityProvider>
    </>
  );
};

export default App;
