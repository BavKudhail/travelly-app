import React from 'react';
import { FiHome, FiSearch, FiBell } from 'react-icons/fi';
import { MdSpaceDashboard, MdOutlineExplore } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';

const loggedOutNavList = [
  {
    title: 'Home',
    icon: FiHome,
    route: '/',
  },
  {
    title: 'Dashboard',
    icon: MdSpaceDashboard,
    route: '/userlogin',
  },
  {
    title: 'Posts',
    icon: MdOutlineExplore,
    route: '/userlogin',
  },
  {
    title: 'Chat',
    icon: BsChatDots,
    route: '/userlogin',
  },
];

export default loggedOutNavList;
