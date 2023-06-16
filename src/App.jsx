import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
// import { createClient } from "@supabase/supabase-js";

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
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  // useEffect(() => {
  //   // Initialize Supabase client
  //   const supabaseClient = createClient(
  //     "https://piyjipnwgzaldrhiwasu.supabase.co",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeWppcG53Z3phbGRyaGl3YXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY5MTkzNDIsImV4cCI6MjAwMjQ5NTM0Mn0.glGKpBRYQip8aUa6ZquhF3aULZNRJAYBaSaqGYngCKM"
  //   );
  //   setSupabase(supabaseClient);
  // }, []);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleGoBack = () => {
    setSelectedShowId(null);
  };

  const handleFavoritesClick = () => {
    setShowFavorites((prevState) => !prevState);
    setSelectedShowId(null);
  };

  return (
    <Provider store={store}>
      <div className="app">
        <Navbar
          onFavoritesClick={handleFavoritesClick}
          showFavorites={showFavorites}
        />
        <div className="content">
          {showFavorites ? (
            <Favourites favoriteEpisodes={favoriteEpisodes} />
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
