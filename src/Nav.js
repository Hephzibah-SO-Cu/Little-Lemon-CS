import React from 'react';
import logo from './icons_assets/Logo.svg'; // Adjust path as needed

function Nav() {
  return (
    <nav className="nav">
      <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reserve">Reserve a Table</a></li>
        <li><a href="#order">Order Online</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
      <div className="user-icon"></div>
    </nav>
  );
}

export default Nav;