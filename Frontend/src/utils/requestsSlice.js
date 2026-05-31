import { createSlice } from "@reduxjs/toolkit";

// =====================================
// Requests Slice
//
// Manages received connection requests
// inside Redux store.
// =====================================

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,

  reducers: {

    // Store received requests
    addRequests: (state, action) => {
      return action.payload;
    },

    // Clear requests data
    removeRequests: () => {
      return null;
    },
  },
});

export const { addRequests, removeRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;