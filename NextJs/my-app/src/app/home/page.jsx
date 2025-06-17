"use client";
import { useEffect } from "react";
import { Layout } from "antd";
import CityList from "../components/City/CityList";
import socket from "@/utils/socket";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    fetch("/home", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
        } else {
          socket.connect();
        }
      })
      .catch(() => {
        router.push("/login");
      });
  
    return () => {
      socket.disconnect();
    };
  }, []);
  

  return (
    <Layout className="p-4 min-h-screen">
      <CityList />
    </Layout>
  );
};

export default Home;
