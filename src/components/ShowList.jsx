import React, { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function ShowList({ onShowClick }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {shows.map((show) => (
        <div key={show.id} onClick={() => handleShowClick(show.id)}>
          <h3>{show.title}</h3>
          <p>{show.description}</p>
        </div>
      ))}
    </div>
  );
}
