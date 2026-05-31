import { createSlice } from '@reduxjs/toolkit'

// =====================================
// User Slice
//
// Manages logged-in user data
// inside Redux store.
// =====================================

const userSlice = createSlice({
  name: "user",
  initialState:null,
  reducers: {

    // Store user data
    addUser: (state,action) =>{
        return action.payload;
    },

    // Remove user data on logout
    removeUser:() =>{
        return null;
    },
  },


});

export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;