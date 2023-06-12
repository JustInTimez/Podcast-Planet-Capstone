import React, { useEffect, useState } from "react";
import SeasonSelector from "../seasonSelector/SeasonSelector";
import Player from "../player/Player";
import { useDispatch } from "react-redux";
import { setSelectedEpisode } from "./../../store/actions/playerActions";
import MoonLoader from "react-spinners/MoonLoader";
import "./SingleShowDetails.css";

export default function ShowDetails({ show, onGoBack }) {
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redux dispatch
  const dispatch = useDispatch();

  // Set state for the show's seasons
  const [selectedSeason, setSelectedSeason] = useState(1);
  // Set state for the show's episodes
  const [selectedSeasonData, setSelectedSeasonData] = useState(null);

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

  useEffect(() => {
    if (showData) {
      const seasonData = seasons.find(
        (season) => season.season === selectedSeason
      );
      setSelectedSeasonData(seasonData);
    }
  }, [selectedSeason, showData]);

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const handlePlayEpisode = (episode) => {
    dispatch(setSelectedEpisode(episode));
  };

  if (!showData) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  const { title, description, seasons } = showData;

  return (
    <div className="single-show-details">
      {showData && (
        <div>
          <h3 className="show-title">{title}</h3>
          <img className="single-show-image" src={showData.image} alt={title} />
          <p className="show-description">{description}</p>

          <SeasonSelector
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSelectSeason={handleSelectSeason}
          />

          {selectedSeasonData && (
            <>
              <h4 className="selected-season-title">
                {selectedSeasonData.title}
              </h4>
              <ul className="episode-list">
                {selectedSeasonData.episodes.map((episode) => (
                  <li key={episode.episode} className="episode-item">
                    <span className="episode-number-pill">
                      EPISODE: {episode.episode}
                    </span>
                    <h5 className="episode-title">{episode.title}</h5>
                    <p className="episode-description">{episode.description}</p>
                    <button
                      className="play-button"
                      onClick={() => handlePlayEpisode(episode)}
                    >
                      Play(Change to icon)
                    </button>
                    {/* Need to add more season info here, later */}
                  </li>
                ))}
              </ul>
            </>
          )}
          <button className="go-back-btn" onClick={onGoBack}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
