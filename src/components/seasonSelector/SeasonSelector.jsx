import React from "react";
import "./SeasonSelector.css";

const SeasonSelector = ({ seasons, selectedSeason, onSelectSeason }) => {
  return (
    <div className="season-selctor">
      <label htmlFor="season-select">Select Season:</label>
      <select
        id="season-select"
        value={selectedSeason}
        onChange={(event) => onSelectedSeason(parseInt(event.target.value))}
      >
        {seasons.map((season) => (
          <option key={season.season} value={season.season}>
            {season.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;