import React, { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import './ShowList.css';

export default function ShowList({ onShowClick }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for initial number of Shows displayed on page
  const [visibleShows, setVisibleShows] = useState(8);
  // State to control display of Show More button
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");
        const data = await response.json();
        setShows(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Issue fetching shows data. Please refresh and try again.",
          error
        );
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  const handleShowClick = (showId) => {
    onShowClick(showId);
  };

  const handleLoadMore = () => {
    // Increase visible shows by a further 8 for the user
    setVisibleShows((prevVisibleShows) => prevVisibleShows + 8);
  };

  const clampText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="show-list-container">
      <div className="show-list">
        {shows.slice(0, visibleShows).map((show) => (
          <div
            className="show-card"
            key={show.id}
            onClick={() => handleShowClick(show.id)}
          >
            <img className="show-image" src={show.image} alt={show.title} />
            <div className="show-details">
              <h3 className="show-title">{show.title}</h3>
              <p className="show-description">
                {clampText(show.description, 100)}
              </p>
              <p className="show-seasons">Seasons: {show.seasons}</p>
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && visibleShows < shows.length && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-spinner">
          <MoonLoader color="#1b7ae4" loading={loading} size={60} />
        </div>
      )}
    </div>
  );
}
