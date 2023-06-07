import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ShowDetails from "./components/ShowDetails";
import ShowList from "./components/ShowList";
import "./App.css";

function App() {
  const [selectedShowId, setSelectedShowId] = useState(null);
  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleGoBack = (showId) => {
    selectedShowId(null);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        {selectedShowId ? (
          <ShowDetails show={selectedShowId} onGoBack={handleGoBack} />
        ) : (
          <ShowList onShowClick={handleShowClick} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
