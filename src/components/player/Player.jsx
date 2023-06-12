import React from "react";
import { useSelector } from "react-redux";

const Player = ({ selectedEpisode }) => {
    const selectedEpisode = useSelector((state) => state.player.selectedEpisode);

    return (
        <div className="player-container">
            <h3>Audio/Episode Player</h3>
            <p>Selected Episode: {selectedEpisode.title}</p>
            
        </div>
    )
}

export default Player;