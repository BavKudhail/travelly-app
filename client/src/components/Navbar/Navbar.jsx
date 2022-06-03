import React from "react";
import "./Navbar.css";
import { navList } from "./Navlist";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <ul className="navbar-items">
          {navList.map((item) => {
            return <li key={item.title}>{item.title}</li>;
          })}
        </ul>
        <SignUpForm />
        <LoginForm />
      </div>
    </>
  );
};

export default Navbar;
