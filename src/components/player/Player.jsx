import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const Player = () => {
  const selectedEpisode = useSelector((state) => state.player.selectedEpisode);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
  }, [selectedEpisode]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="player-container">
      {selectedEpisode && (
        <>
          <h2>{selectedEpisode.title}</h2>
          <p>{selectedEpisode.description}</p>
          <audio src={selectedEpisode.file} controls autoPlay={isPlaying} />
          {isPlaying ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handlePlay}>Play</button>
          )}
        </>
      )}
    </div>
  );
};

export default Player;
