import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const Favourites = ({ favoriteEpisodeIDs, toggleFavorite }) => {

  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      const episodes = [];

      for (let episodeKey of favoriteEpisodeIDs) {
        const episodeIDs = episodeKey.split("-");
        const showID = episodeIDs[0];
        const seasonID = episodeIDs[1];
        const episodeID = episodeIDs[2];

        try {
          const response = await fetch(
            `https://podcast-api.netlify.app/id/${showID}`
          );
          const data = await response.json();
          const seasonData = data.seasons.find(
            (season) => season.season === parseInt(seasonID)
          );

          const favObject = {
            key: episodeKey,
            show: data,
            season: seasonData,
            episode: seasonData.episodes.find(
              (episode) => episode.episode === parseInt(episodeID)
            ),
          };

          episodes.push(favObject);
        } catch (error) {
          console.error(
            "Issue fetching this show's details. Please try again.",
            error
          );
        }
      }

      setFavoriteEpisodes(episodes);
    };

    fetchFavoriteEpisodes();
  }, [favoriteEpisodeIDs]);

  return (
    <div>
      <h2>Favorite Episodes</h2>
      {favoriteEpisodes.map((favorite) => (
        <div key={favorite.key}>
          {console.log(favorite)}
          <h3>{favorite.episode.title}</h3>
          <p>{favorite.episode.description}</p>
          {/* Add any other relevant information here */}
          <button onClick={() => toggleFavorite(favorite.episode, favorite.season, favorite.show)}>
            <AiFillHeart />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favourites;
