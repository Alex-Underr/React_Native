import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password, login }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      const { uid, displayName } = auth.currentUser;
      return { userId: uid, name: displayName, email };
    } catch (error) {
      alert(error.code);
      console.log("error.message", error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = auth.currentUser;
      return { userId: uid, name: displayName, email };
    } catch (error) {
      alert("Invalid email or password");
      console.log("error.message", error.message);
    }
  }
);

export const refresh = createAsyncThunk("auth/update", async () => {
  const auth = await getAuth();
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const email = user.email;
      const isLoggedIn = true;
      return { userId: uid, name: displayName, email, isLoggedIn };
    } else {
      console.log("User is signed out");
    }
  });
});

export const signout = createAsyncThunk("auth/signout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error.message", error.message);
  }
});
