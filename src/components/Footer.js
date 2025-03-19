import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for the logo
import logo from '../icons_assets/Logo.svg'; // Adjust path as needed

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" aria-label="Go to homepage">
          <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
        </Link>
        <nav aria-label="Footer main navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
          </ul>
        </nav>
        <p>Contact: <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
        <nav aria-label="Social media navigation">
          <ul>
            <li><a href="#facebook" aria-label="Visit our Facebook page">Facebook</a></li>
            <li><a href="#instagram" aria-label="Visit our Instagram page">Instagram</a></li>
            <li><a href="#twitter" aria-label="Visit our Twitter page">Twitter</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;