import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEpisode: {
    title: "",
    description: "",
    file: null,
  }
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSelectedEpisode: (state, action) => {
      console.log(action.payload); // Check if the payload is received correctly
      state.selectedEpisode = action.payload;
    },
  },
});

export const { setSelectedEpisode } = playerSlice.actions;
export default playerSlice.reducer;
