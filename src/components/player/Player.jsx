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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (audioRef.current && audioRef.current.currentTime > 0) {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleUnload = (event) => {
      if (audioRef.current && audioRef.current.currentTime > 0) {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

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
