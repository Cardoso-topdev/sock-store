import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout(props) {
  return (
    <>
      {props.children}
      {/* <Navbar /> */}
      <Footer />
    </>
  );
}
