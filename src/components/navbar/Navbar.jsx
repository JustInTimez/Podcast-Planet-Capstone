import React, { useState } from 'react';
import logo from "/images/podcast-planet-logo-planetglow.png";
import './Navbar.css';

export default function Navbar({ onFavoritesClick, showFavorites }) {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img className="navbar-logo" src={logo} alt="Podcast Planet Logo" />
        <button onClick={onFavoritesClick}>
          {showFavorites ? 'Back' : 'Favourites'}
        </button>
      </div>
    </nav>
  );
}