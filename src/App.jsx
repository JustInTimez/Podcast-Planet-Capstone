import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./store/store";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ShowDetails from "./components/singleShowDetails/SingleShowDetails";
import ShowList from "./components/showList/ShowList";
import Favourites from "./components/favourites/Favourites";
import "./App.css";

function App() {
  // ==============================================================================
  //                                NAVIGATION START
  // ==============================================================================

  // States
  const [selectedShowId, setSelectedShowId] = useState(null);

  // Handles clicking on a show to view it's details
  const handleShowClick = async (showId) => {
    setSelectedShowId(showId);
  };

  // Handles the back button to return from show's view
  const handleGoBack = () => {
    setSelectedShowId(null);
  };

  // Handles the favorites button click in the Navbar
  const handleFavoritesNavigation = () => {
    setViewingFavorites((prevState) => !prevState);
    setSelectedShowId(null);
  };
  // ==============================================================================
  //                                NAVIGATION END
  // ==============================================================================

  // ==============================================================================
  //                                FAVOURITES START
  // ==============================================================================

  // States
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteEpisodes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Toggles the favorite status of an episode
  const toggleFavorite = (episode, season, show) => {
    const compositeKey = `${show.id}-${season.season}-${episode.episode}`;

    if (
      favoriteEpisodes.some((favEpisode) => favEpisode.compositeKey === compositeKey)
    ) {
      removeFavorite(compositeKey);
    } else {
      addFavorite(compositeKey);
    }
  };

  /* Adds selected episode to favorites
   * Composite key created by combining the show's ID, with the seasons number and episode number
   * Sets React state as well as localStorage
   */
  const addFavorite = (compositeKey) => {
    const timeStamp = new Date;
    const favorite = {
      compositeKey: compositeKey,
      timeStamp: timeStamp
    };
    const updatedFavorites = [...favoriteEpisodes, favorite];
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updatedFavorites));
  };

  /* Removes selected episode to favorites
   * Composite key created by combining the show's ID, with the seasons number and episode number
   * Sets React state as well as localStorage
   */
  const removeFavorite = (compositeKey) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (favEpisode) => favEpisode.compositeKey !== compositeKey
    );
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem("favoriteEpisodes", JSON.stringify(updatedFavorites));
  };

  // ==============================================================================
  //                                FAVOURITES END
  // ==============================================================================

  return (
    <div className="app">
      <Navbar
        onFavoritesClick={handleFavoritesNavigation}
        viewingFavorites={viewingFavorites}
      />
      <div className="content">
        {viewingFavorites ? (
          <Favourites
            favoriteEpisodeIDs={favoriteEpisodes}
            toggleFavorite={toggleFavorite}
          />
        ) : selectedShowId ? (
          <ShowDetails
            show={selectedShowId}
            onGoBack={handleGoBack}
            toggleFavorite={toggleFavorite}
            favoriteEpisodes={favoriteEpisodes}
          />
        ) : (
          <ShowList onShowClick={handleShowClick} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
