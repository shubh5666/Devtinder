import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestsSlice";


// =====================================
// Redux Store
//
// Central store for managing
// application state.
//
// Stores:
// - User Data
// - Feed Data
// - Connections
// - Requests
// =====================================

const appStore = configureStore({
  reducer: {

    // Logged-in user data
    user: userReducer,

    // Feed users
    feed: feedReducer,

    // User connections
    connections :connectionReducer,

    // Connection requests
    requests: requestReducer,
  },
});


export default appStore;