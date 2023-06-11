import React, { useEffect, useState } from "react";

const Player = ({ selectedEpisode }) => {

    return (
        <div>
            <h3>Audio/Episode Player</h3>
            <p>Selected Episode: {selectedEpisode.title}</p>
            
        </div>
    )
}

export default Player;