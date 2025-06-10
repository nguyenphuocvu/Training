'use client '
import CityList from "../components/City/CityList"
import { Layout } from "antd"
import "../../styles/index.css"
const Home = () => {
  return (
    <Layout>
       <CityList/>
    </Layout>
  )
}

export default Home