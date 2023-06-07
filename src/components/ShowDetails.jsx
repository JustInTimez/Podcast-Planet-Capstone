import React, { useState } from "react";

export default function ShowDetails({ show, onGoBack }) {
  return (
    <div>
      <h3>{show.title}</h3>
      <p>{show.description}</p>
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
}
