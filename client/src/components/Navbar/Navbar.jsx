import React from "react";
import "./Navbar.css";
import { navList } from "./Navlist";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <ul className="navbar-items">
          {navList.map((item) => {
            return <li>{item.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
