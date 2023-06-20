import React, { useState, useEffect } from "react";
import Carousel from "../carousel/Carousel";
import MoonLoader from "react-spinners/MoonLoader";
import { format } from "date-fns";
import "./ShowList.css";

export default function ShowList({ onShowClick }) {
  // States
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  /*
   * State for loading more shows
   * If no state, then my shows area goes blank with spinner until next shows are fetched and appended to DOM
   * Adding additional state to handle this undesirable behavior
   */
  const [loadingMore, setLoadingMore] = useState(false);

  // State for initial number of Shows displayed on page
  const [visibleShows, setVisibleShows] = useState(8);
  // State for the selected sorting option
  const [sortBy, setSortBy] = useState("");
  // State for typed filtering
  const [filterValue, setFilterValue] = useState("");
  // State for Carousel shows
  const [carouselShows, setCarouselShows] = useState([]);

  // Fetch the show's data from the API, and show on DOM
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");
        const data = await response.json();
        setShows(data);
        setLoading(false);
        // Initialize carouselShows with initial data
        setCarouselShows(data.slice(0, visibleShows));
      } catch (error) {
        console.error(
          "Issue fetching shows data. Please refresh and try again.",
          error
        );
      }
    };

    fetchShows();
  }, []);
  

  useEffect(() => {
    const filteredShows = shows.filter(
      (show) =>
        show.title.toLowerCase().includes(filterValue.toLowerCase()) &&
        !carouselShows.find((carouselShow) => carouselShow.id === show.id)
    );
  
    // Shuffle the filtered shows array
    const shuffledShows = filteredShows.sort(() => 0.5 - Math.random());
  
    setCarouselShows(shuffledShows.slice(0, visibleShows));
  }, [shows, filterValue, visibleShows]);

  // Apply sorting to the shows array
  useEffect(() => {
    let sortedShows = [...shows];

    if (sortBy === "titleAsc") {
      sortedShows.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      sortedShows.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "recent") {
      sortedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortBy === "leastRecent") {
      sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }

    setShows(sortedShows);
  }, [sortBy]);

  // Show loading spinner while loading shows data
  if (loading) {
    return (
      <div className="loading-spinner">
        <MoonLoader color="#1b7ae4" loading={loading} size={60} />
      </div>
    );
  }

  // Handles the click to view a specific show's details
  const handleShowClick = (showId) => {
    onShowClick(showId);

    // Filter out the clicked show from carouselShows
    setCarouselShows((prevCarouselShows) =>
      prevCarouselShows.filter((show) => show.id !== showId)
    );
  };


  // Handles the loading of more shows when the load more button is clicked
  const handleLoadMore = async () => {
    setLoadingMore(true);

    try {
      /*
       * Adding fake delay to API resolve, so that I can show the spinner for loading in new data
       * To satisfy User Story #9
       */
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Increase visible shows by a further 8 for the user
      setVisibleShows((prevVisibleShows) => prevVisibleShows + 8);
      setLoading(false);
    } catch (error) {
      console.error("Issue fetching additional shows. Pls refresh.", error);
    }
    // Set loading state to false once the data has been fetched
    setLoadingMore(false);
  };

  // Shorten and make neat on the display of description data of a show
  const clampText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  // Format the display of Updated field data of a show into a human-readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM, yyyy");
  };

  // Map genres as recommended in brief
  const genreMapping = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  // Map over and pull the genre title(s) of a show
  const getGenreTitles = (genreIds) => {
    return genreIds.map((genreId) => (
      <span className="genre-pill" key={genreId}>
        {genreMapping[genreId]}
      </span>
    ));
  };

  return (
    <div className="show-list-container">
      <div>You may be interested in...</div>
      <Carousel shows={carouselShows} onShowClick={onShowClick} />
      <div className="sorting-options">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Choose:</option>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
          <option value="recent">Most Recent Updated</option>
          <option value="leastRecent">Least Recent Updated</option>
        </select>
        Search:
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter by title"
        />
      </div>
      <div className="show-list">
        {shows
          .filter((show) =>
            show.title.toLowerCase().includes(filterValue.toLowerCase())
          )
          .slice(0, visibleShows)
          .map((show) => (
            <div
              className="show-card"
              key={show.id}
              onClick={() => handleShowClick(show.id)}
            >
              <img className="show-image" src={show.image} alt={show.title} />
              <div className="show-details">
                <h3 className="show-title">{show.title}</h3>
                <p className="show-seasons">Seasons: {show.seasons}</p>
                <p className="show-description">
                  {clampText(show.description, 100)}
                </p>
                <div className="genre-container">
                  <span className="genre-label">Genres</span>
                  <div className="genre-list">
                    <p className="show-genres">
                      {getGenreTitles(show.genres)}
                    </p>
                  </div>
                </div>
                <p className="last-updated">
                  Updated: {formatDate(show.updated)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {loadingMore ? (
        <div className="loading-spinner">
          <MoonLoader color="#1b7ae4" loading={true} size={60} />
        </div>
      ) : (
        visibleShows < shows.length && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )
      )}
    </div>
  );
}
