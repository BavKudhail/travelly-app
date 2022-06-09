import React from "react";
import { FiHome, FiSearch, FiBell } from "react-icons/fi";
import { MdSpaceDashboard, MdOutlineExplore } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";

const navList = [
  {
    title: "Home",
    icon: FiHome,
    route: "/",
  },
  {
    title: "Dashboard",
    icon: MdSpaceDashboard,
    route: "/dashboard",
  },
  {
    title: "Posts",
    icon: MdOutlineExplore,
    route: "/posts",
  },
  {
    title: "Chat",
    icon: BsChatDots,
    route: "/chat",
  },
];

export default navList;
