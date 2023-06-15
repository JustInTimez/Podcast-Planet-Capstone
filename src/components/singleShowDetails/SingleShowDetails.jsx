import React, { useEffect, useState } from "react";
import SeasonSelector from "../seasonSelector/SeasonSelector";
import Player from "../player/Player";
import { useDispatch } from "react-redux";
import { setSelectedEpisode } from "./../../store/actions/playerActions";
import MoonLoader from "react-spinners/MoonLoader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./SingleShowDetails.css";

export default function ShowDetails({ show, onGoBack }) {
  // STATES:
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Set state for the show's seasons
  const [selectedSeason, setSelectedSeason] = useState(1);
  // Set state for the show's episodes
  const [selectedSeasonData, setSelectedSeasonData] = useState(null);
  // State for favourited episodes
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  // Redux dispatch
  const dispatch = useDispatch();

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
    const { seasons } = showData;
    let selectedEpisode;

    for (const season of seasons) {
      const { episodes } = season;
      selectedEpisode = episodes.find((ep) => ep.episode === episode.episode);

      if (selectedEpisode) {
        break;
      }
    }

    if (selectedEpisode) {
      const { file } = selectedEpisode;

      // Clear the existing audio source, if any
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = "";

      // Set the new audio source
      audioPlayer.src = file;

      // Play the audio
      audioPlayer.play();

      dispatch(setSelectedEpisode(selectedEpisode));
    }
  };

  const addToFavorites = (episode) => {
    if (isFavorite(episode)) {
      // Remove from favorites
      const updatedFavorites = favoriteEpisodes.filter(
        (favEpisode) =>
          favEpisode.episode !== episode.episode ||
          favEpisode.show !== title ||
          favEpisode.season !== selectedSeason
      );
      setFavoriteEpisodes(updatedFavorites);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const newFavorite = {
        ...episode,
        show: title,
        season: selectedSeason,
      };
      const updatedFavorites = [...favoriteEpisodes, newFavorite];
      setFavoriteEpisodes(updatedFavorites);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
    }
  };
  
  const checkIsFavorite = (episode) => {
    return favoriteEpisodes.some(
      (favEpisode) =>
        favEpisode.episode === episode.episode &&
        favEpisode.show === title &&
        favEpisode.season === selectedSeason
    );
  };
  
  const isFavorite = (episode) =>
  favoriteEpisodes.some(
    (favEpisode) =>
      favEpisode.episode === episode.episode &&
      favEpisode.show === title &&
      favEpisode.season === selectedSeason
  );

  if (!showData) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  const { title, description, seasons } = showData;


  // Amend main image to be the selected season's image
  const selectedSeasonImage =
    seasons.find((season) => season.season === selectedSeason)?.image ||
    showData.image;

  return (
    <div className="single-show-details">
      {showData && (
        <div>
          <h3 className="show-title">{title}</h3>
          <img
            className="single-show-image"
            src={selectedSeasonImage}
            alt={title}
          />
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
              <p className="season-episodes">
                Episodes: {selectedSeasonData.episodes.length}
              </p>
              <ul className="episode-list">
                {selectedSeasonData.episodes.map((episode) => (
                  <li key={episode.episode} className="episode-item">
                    <span className="episode-number-pill">
                      EPISODE: {episode.episode}
                    </span>
                    <h5 className="episode-title">{episode.title}</h5>
                    {isFavorite(episode) ? (
                      <AiFillHeart
                        className="favourite-icon"
                        onClick={() => addToFavorites(episode)}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="favourite-icon"
                        onClick={() => addToFavorites(episode)}
                      />
                    )}
                    <p className="episode-description">{episode.description}</p>
                    <button
                      className="play-button"
                      onClick={() => handlePlayEpisode(episode)}
                    >
                      Play(Change to icon)
                    </button>
                  </li>
                ))}
              </ul>
              <Player />
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
