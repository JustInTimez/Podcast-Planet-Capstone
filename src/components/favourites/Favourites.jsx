import React from "react";
import './Favourites.css';

export default function Favourites() {
  // const favoriteEpisodes = useSelector((state) => state.player.favoriteEpisodes);
  const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

  return (
    <div className="favourites-container">
      <h1>Favorites</h1>
      {favoriteEpisodes.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        <ul>
          {favoriteEpisodes.map((episode) => (
            <li key={episode.episode}>{episode.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}