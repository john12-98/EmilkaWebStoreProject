import React from "react";
import Categories from "../components/Categories";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Slider />
      <Categories />
      {/* <Products /> */}
      {/* <Location/> */}
      <Footer />
    </div>
  );
};

export default Home;
