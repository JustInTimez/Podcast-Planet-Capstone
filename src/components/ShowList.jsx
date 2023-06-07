import React, { useState, useEffect } from "react";

export default function ShowList() {
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
    return <div>Loading shows...</div>;
  }

  return (
    <div>
      {shows.map((show) => (
        <div key={show.id}>
          <h3>{show.title}</h3>
          <p>{show.description}</p>
        </div>
      ))}
    </div>
  );
}
