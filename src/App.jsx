import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

// COMPONENTS
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ShowDetails from "./components/singleShowDetails/SingleShowDetails";
import ShowList from "./components/showList/ShowList";
import Favourites from "./components/favourites/Favourites";

import "./App.css";

function App() {
  // States
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleGoBack = () => {
    setSelectedShowId(null);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Provider store={store}>
      <div className="app">
        <Navbar onFavoritesClick={handleFavoritesClick} showFavorites={showFavorites} />
        <div className="content">
          {showFavorites ? (
            <Favourites />
          ) : selectedShowId ? (
            <ShowDetails show={selectedShowId} onGoBack={handleGoBack} />
          ) : (
            <ShowList onShowClick={handleShowClick} />
          )}
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
