import React from 'react';
import logo from './icons_assets/Logo.svg';

function Header() {
  return (
    <header>
      <img src={logo} alt="Little Lemon Logo" width="50" height="50" />
    </header>
  );
}

export default Header;