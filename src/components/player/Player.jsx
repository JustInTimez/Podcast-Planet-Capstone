import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import "./Player.css";

const Player = () => {
  const selectedEpisode = useSelector((state) => state.player.selectedEpisode);
  const [isLoading, setIsLoading] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  useEffect(() => {
    setAudioURL(null);
    setIsLoading(true);

    const fetchAudioFile = async () => {
      try {
        if (!selectedEpisode) {
          throw new Error("No selected episode available");
        }

        console.log("Fetching audio file:", selectedEpisode.file);
        const response = await fetch(selectedEpisode.file);
        console.log("Fetch response status:", response.status);

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          console.log("Audio file URL:", url);
          setAudioURL(url);
        } else {
          throw new Error("Response not OK");
        }
      } catch (error) {
        console.error("Couldn't get your podcast audio. Try again", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudioFile();
  }, [selectedEpisode]);

  if (isLoading || !selectedEpisode) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={true} size={60} />
      </div>
    );
  }

  return (
    <div className="player-container">
      <div className="player">
        <h2>{selectedEpisode.title}</h2>
        <p>{selectedEpisode.description}</p>
        {audioURL && <audio controls src={audioURL} />}
      </div>
    </div>
  );
};

export default Player;
