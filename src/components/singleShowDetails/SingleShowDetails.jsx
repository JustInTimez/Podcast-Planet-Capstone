import React, { useEffect, useState } from "react";
import SeasonSelector from "../seasonSelector/SeasonSelector";
import Player from "../player/Player";
import MoonLoader from "react-spinners/MoonLoader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./SingleShowDetails.css";

export default function ShowDetails({
  show,
  onGoBack,
  toggleFavorite,
  favoriteEpisodes,
}) {
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedSeasonData, setSelectedSeasonData] = useState(null);

  // console.log(showData)

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
      const seasonData = showData.seasons.find(
        (season) => season.season === selectedSeason
      );
      setSelectedSeasonData(seasonData);
    }
  }, [selectedSeason, showData]);

  const handleSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    if (showData) {
      const seasonData = showData.seasons.find(
        (season) => season.season === seasonNumber
      );
      setSelectedSeasonData({ ...seasonData });
      // if (seasonData) {
      //   const updatedEpisodes = seasonData.episodes.map((episode) => {

      //     const favorited = favoriteEpisodes.some(
      //       (favEpisodeKey) => favEpisodeKey === compositeKey
      //     );
      //     return { ...episode, favorited };
      //   });
      //   // console.log(updatedEpisodes)
      // }
    }
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
      playEpisode(episode);
    }
  };

  const episodeIsFavorited = (episode) => {
    const compositeKey = `${showData.id}-${selectedSeasonData.season}-${episode.episode}`;
    return favoriteEpisodes.some(
      (favEpisodeKey) => favEpisodeKey === compositeKey
    );
  };

  if (!showData) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  const { title, description, seasons } = showData;

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
                    {episodeIsFavorited(episode) ? (
                      <AiFillHeart
                        className="favourite-icon"
                        onClick={() =>
                          toggleFavorite(
                            episode,
                            selectedSeasonData,
                            showData
                          )
                        }
                      />
                    ) : (
                      <AiOutlineHeart
                        className="favourite-icon"
                        onClick={() =>
                          toggleFavorite(
                            episode,
                            selectedSeasonData,
                            showData
                          )
                        }
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
