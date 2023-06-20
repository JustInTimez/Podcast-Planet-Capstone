import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Player.css";

const Player = () => {
  const selectedEpisode = useSelector((state) => state.player.selectedEpisode);
  const audioRef = useRef(null);
  const [confirmClose, setConfirmClose] = useState(false);

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
        setConfirmClose(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleConfirmClose = () => {
    setConfirmClose(false);
  };

  if (!selectedEpisode) {
    return null; // Return null if there is no selected episode
  }

  return (
    <div className="player-container">
      {confirmClose && (
        <div className="confirm-close">
          <p>Are you sure you want to close the page?</p>
          <button onClick={handleConfirmClose}>Cancel</button>
          <button onClick={() => window.close()}>Confirm</button>
        </div>
      )}
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
