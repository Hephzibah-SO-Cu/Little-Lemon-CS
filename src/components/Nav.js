import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../icons_assets/Logo.svg';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav" ref={menuRef}>
      <Link to="/" onClick={handleLinkClick} aria-label="Go to homepage">
        <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
      </Link>
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
        <li><Link to="/booking" onClick={handleLinkClick}>Reserve a Table</Link></li>
        <li><Link to="/order" onClick={handleLinkClick}>Order Online</Link></li>
        <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
      </ul>
      <button className="user-icon" aria-label="Open user menu">
        {/* Assuming an icon will be added here, e.g., a user profile icon */}
      </button>
    </nav>
  );
}

export default Nav;