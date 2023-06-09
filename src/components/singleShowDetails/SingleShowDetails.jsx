import React, { useEffect, useState } from "react";
import SeasonSelector from "../seasonSelector/SeasonSelector";
import MoonLoader from "react-spinners/MoonLoader";
import "./SingleShowDetails.css";

export default function ShowDetails({ show, onGoBack }) {
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set state for the show's seasons
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${show}`
        );
        const data = await response.json();
        setShowData(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Issue fetching this show's details. Please try again.",
          error
        );
      }
    };

    fetchShowDetails();
  }, [show]);

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  if (!showData) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  const { title, description, seasons } = showData;
  const selectedSeasonData = seasons.find(
    (season) => season.season === selectedSeason
  );

  return (
    <div>
      <button onClick={onGoBack}>Go Back</button>
      {showData && (
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <img className="show-image" src={showData.image} alt={title} />

          <SeasonSelector
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSelectSeason={handleSelectSeason}
          />

          <h4>{selectedSeasonData.title}</h4>
          <ul>
            {selectedSeasonData.episodes.map((episode) => (
              <li key={episode.episode}>
                <h5>{episode.title}</h5>
                <p>{episode.description}</p>
                {/* Need to add more season info here, later */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
