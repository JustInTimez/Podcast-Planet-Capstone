import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ShowDetails from "./components/singleShowDetails/SingleShowDetails";
import ShowList from "./components/showList/ShowList";
import "./App.css";

function App() {
  const [selectedShowId, setSelectedShowId] = useState(null);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleGoBack = () => {
    setSelectedShowId(null);
  };

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
