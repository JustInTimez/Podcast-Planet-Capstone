import React from 'react';
import logo from "/images/podcast-planet-logo-planetglow.png";
import './Navbar.css';

export default function Navbar({ onFavoritesClick, viewingFavorites }) {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img className="navbar-logo" src={logo} alt="Podcast Planet Logo" />
        <button onClick={onFavoritesClick}>
          {viewingFavorites ? 'Back' : 'Favourites'}
        </button>
      </div>
    </nav>
  );
}