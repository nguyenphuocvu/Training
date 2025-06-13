 "use client";
import { useEffect } from "react";
import { Layout, Button } from "antd";
import { useRouter } from "next/navigation";
import CityList from "../components/City/CityList";
import socket from "@/utils/socket";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
    }

    socket.connect();
    return () => socket.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return (
    <Layout className="p-4 min-h-screen">
      <div className="flex justify-end mb-4">
        <Button danger type="primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
      <CityList />
    </Layout>
  );
};

export default Home;
