import { SET_SELECTED_EPISODE } from "./playerActionTypes";

export const setSelectedEpisode = (episode) => ({
  type: SET_SELECTED_EPISODE,
  payload: episode,
});
