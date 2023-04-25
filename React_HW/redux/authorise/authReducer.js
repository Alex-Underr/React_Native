import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, signInUser, refresh, signout } from "./authOperations";

const initialState = {
  userId: null,
  name: null,
  email: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, { payload }) => (state = payload))
      .addCase(signInUser.fulfilled, (state, { payload }) => (state = payload))
      .addCase(refresh.fulfilled, (state, { payload }) => (state = payload))
      .addCase(signout.fulfilled, (state) => (state = initialState))
      .addCase(refresh.rejected, (state) => (state = initialState));
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
