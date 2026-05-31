import { createSlice } from "@reduxjs/toolkit";

// =====================================
// Feed Slice
//
// Manages feed users data
// inside Redux store.
// =====================================

const feedSlice = createSlice({

  name: "feed",

  initialState: null,

  reducers: {

    // Store feed data
    addFeed: (state, action) => {
      return action.payload;
    },

    // Remove user from feed after
    // Ignore or Interested action
    removeUserFeed: (state,action) => {
      const newFeed = state.filter(
        (user) => user._id != action.payload);
      return newFeed;
    },

  },

});

export const { addFeed, removeUserFeed } = feedSlice.actions;

export default feedSlice.reducer;