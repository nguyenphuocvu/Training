'use client';
import { useEffect } from 'react';
import socket from '@/utils/socket';
import { Layout } from 'antd';
import CityList from "../components/City/CityList";

const Home = () => {
  useEffect(() => {
    fetch('/api/socket');
   socket.connect()
   return () => socket.disconnect()
  }, []);

  return (
    <Layout>
      <CityList />
    </Layout>
  );
};

export default Home;
