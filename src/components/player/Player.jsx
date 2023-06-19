import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import "./Player.css";
import { setSelectedEpisode } from "../../store/actions/playerActions";

const Player = () => {
  const selectedEpisode = useSelector((state) => state.player.selectedEpisode);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedEpisode) {
      const { file } = selectedEpisode;
      audioRef.current.src = file;
      audioRef.current.play();
    }
  }, [selectedEpisode]);

  // WIP: Handles the playing of the audio for a episode in a season of a show
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

  return (
    <div className="player-container">
      <div className="player">
        <h2>{selectedEpisode.title}</h2>
        <p>{selectedEpisode.description}</p>
        <audio id="audioPlayer" ref={audioRef} controls />
      </div>
    </div>
  );
};

export default Player;
