import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./Player.css";

const Player = () => {
  const selectedEpisode = useSelector((state) => state.player.selectedEpisode);
  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedEpisode) {
      audioRef.current.src = selectedEpisode.file;
      audioRef.current.play();
    }
  }, [selectedEpisode]);

  if (!selectedEpisode) {
    return null; // Return null if there is no selected episode
  }

  return (
    <div className="player-container">
      <div className="player">
        <div className="info-container">
          <div className="title">{selectedEpisode.title}</div>
          <div className="description">{selectedEpisode.description}</div>
        </div>
        <audio id="audioPlayer" ref={audioRef} controls />
      </div>
    </div>
  );  
};

export default Player;
