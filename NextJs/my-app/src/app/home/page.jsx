"use client";
import { Layout } from "antd";
import CityList from "../components/City/CityList";
import withAuth from "@/hoc/withAuth";

const Home = () => {
  return (
    <Layout className="p-4 min-h-screen">
      <CityList />
    </Layout>
  );
};

export default withAuth(Home);
