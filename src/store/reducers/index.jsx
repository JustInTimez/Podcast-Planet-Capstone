import { combineReducers } from "redux";
import playerReducer from "./playerReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  // Thinking to consolidate all my React state into the store, then they are all in one place and easier to manage. As daar tyd is :)
});

export default rootReducer;
