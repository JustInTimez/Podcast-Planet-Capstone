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
  // const [selectedEpisode, setSelectedEpisode] = useState(null);

  // const handleEpisodeSelect = (episode) => {
  //   setSelectedEpisode(episode);
  // };

  const handleShowClick = async (showId) => {
    setSelectedShowId(showId);
  };

  const handleGoBack = () => {
    setSelectedShowId(null);
  };

  const handleFavoritesNavigation = () => {
    setViewingFavorites((prevState) => !prevState);
    setSelectedShowId(null);
    setSelectedEpisode(null);
  };
  // ==============================================================================
  //                                NAVIGATION END
  // ==============================================================================

  // ==============================================================================
  //                                FAVOURITES START
  // ==============================================================================
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteEpisodes");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (episode, season, show) => {
    const compositeKey = `${show.id}-${season.season}-${episode.episode}`;
    
    if (
      favoriteEpisodes.some(
        (favEpisodeKey) => favEpisodeKey === compositeKey
      )
    ) {
      removeFavorite(compositeKey);
    } else {
      addFavorite(compositeKey);
    }

    console.log(favoriteEpisodes)
  };

  const addFavorite = (compositeKey) => {
    const updatedFavorites = [...favoriteEpisodes, compositeKey];
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem(
      "favoriteEpisodes",
      JSON.stringify(updatedFavorites)
    );
  }
  
  const removeFavorite = (compositeKey) => {
    const updatedFavorites = favoriteEpisodes.filter(
      (favEpisodeKey) => favEpisodeKey !== compositeKey
    );
    setFavoriteEpisodes(updatedFavorites);
    localStorage.setItem(
      "favoriteEpisodes",
      JSON.stringify(updatedFavorites)
    );
  }

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
