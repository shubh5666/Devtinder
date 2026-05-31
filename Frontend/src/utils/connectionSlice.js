import { createSlice } from "@reduxjs/toolkit";

// =====================================
// Connections Slice
//
// Manages user's connections data
// inside Redux store.
// =====================================

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,

  reducers: {

    // Store all connections
    addConnections: (state, action) => {
      return action.payload;
    },

    // Clear connections data
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;