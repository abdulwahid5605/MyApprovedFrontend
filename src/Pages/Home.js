import React from "react";
import Header from "../Header";
import Main from "../Main";
import Services from "../Services";
import AboutUs from "../AboutUs";
import Footer from "../Footer";
import DropSection from "../DropSection";

import "../styles.css";

function Home() {
  return (
    <div className="">
      <Main />
      <Services />
      <AboutUs />
      <DropSection />
    </div>
  );
}

export default Home;

