import { Layout } from "antd";
import CityList from "./components/City/CityList";
import "../styles/index.css"

export default function Home() {
  return (
    <Layout>
       <CityList/>
    </Layout>
  );
}
