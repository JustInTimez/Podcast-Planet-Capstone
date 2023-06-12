export const setSelectedEpisode = (episode) => {
  return {
    type: "SET_SELECTED_EPISODE",
    payload: episode,
  };
};