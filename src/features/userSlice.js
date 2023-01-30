// // What is a slice in redux

// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//      name: "user",
//      initialState: {
//           user:null
//      },
//      reducers: {
//           // create the functions that are being performed
//           login: (state, action) => {
//                state.user = action.payload;
//           },
//           logout: (state) => {
//                state.user = null;
//           }
//      }
// })

// export const {login, logout} = userSlice.actions;

// export const selectUser = (state) => state.user.user;

// export default userSlice.reducer;

