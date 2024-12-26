import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import HeroSection from "./HeroSection";
import Pricing from "./Pricing";
import UseAuth from "../CustomHook/UseAuth";
import AdminHomePage from "./AdminHomePage";
import EmployeeHomePage from "./EmployeeHomePage";
import { Helmet } from "react-helmet-async";


const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const {logout, user} = UseAuth()
  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error("Error fetching roles:", error);
    });
  }, [user])
console.log(data)
const filterData = data?.filter((item) => item?.email === user?.email)
const roles = filterData?.[0]?.role
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {
        loading ? 
        <div className="h-[70vh] w-full flex justify-center items-center">
          <span className="loader"></span>
        </div> :
        <div>
      {
        roles === undefined && 
        <div>
          <HeroSection/>
          <AboutUs/>
          <Pricing/>
        </div>
      }
      {
        roles === "Admin"  && 
        <div>
          {
            loading ? 
            <div className="h-[70vh] w-full bg-white flex justify-center items-center">
              <span className="loader"></span>
            </div> :
            <AdminHomePage/>
          }
          
        </div>
      }
      {
        roles === "Employee"  && 
        <div>
          <EmployeeHomePage/>
        </div>
      }
      </div>
      }
      
      
    </div>
  );
};

export default Home;
