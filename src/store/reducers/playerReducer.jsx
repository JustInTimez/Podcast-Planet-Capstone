const initialState = {
  selectedEpisode: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_EPISODE":
      return {
        ...state,
        selectedEpisode: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
