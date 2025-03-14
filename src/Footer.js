import React from 'react';
import logo from './icons_assets/Logo.svg';// Adjust path as needed

function Footer() {
  return (
    <footer>
      <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
      <p>Contact: <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
      <nav>
        <ul>
          <li><a href="#home">Home</a> | <a href="#about">About</a> | <a href="#menu">Menu</a> | <a href="#facebook">Facebook</a> | <a href="#instagram">Instagram</a> | <a href="#twitter">Twitter</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;