import React from 'react';
import logo from './icons_assets/Logo.svg'; // Adjust path as needed

function Footer() {
  return (
    <footer>
      <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
        </ul>
      </nav>
      <p>Contact: <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
      <nav>
        <ul>
          <li><a href="#facebook">Facebook</a></li>
          <li><a href="#instagram">Instagram</a></li>
          <li><a href="#twitter">Twitter</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;