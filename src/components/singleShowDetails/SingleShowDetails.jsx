import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import './SingleShowDetails.css';

export default function ShowDetails({ show, onGoBack }) {
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        console.log("Show ID:", show);
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${show}`
        );
        const data = await response.json();
        setShowData(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Issue fetching this show's details. Please try again.",
          error
        );
      }
    };

    fetchShowDetails();
  }, [show]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={onGoBack}>Go Back</button>
      {showData && (
        <div>
          <h3>{showData.title}</h3>
          <p>{showData.description}</p>
          <img src={showData.image} alt={showData.title} />
        </div>
      )}
    </div>
  );
}
