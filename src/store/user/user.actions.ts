import {createAsyncThunk} from "@reduxjs/toolkit";

// action types
import {SIGN_IN, SIGN_UP, SIGN_OUT, GET_USER} from "./user.actionTypes";

// services
import authService from "../../services/authService";
import userService from "../../services/userService";

// types
import {SignInData, SignUpData} from "../../types/UserInput";

export const signIn = createAsyncThunk(SIGN_IN, async (data: SignInData, thunkAPI) => {
  const user = await authService.signIn(data.email, data.password);

  if (!user) {
    thunkAPI.rejectWithValue('Sign in failed');
    return;
  }

  const userInDb = await userService.getUser();

  if (!userInDb) {
    thunkAPI.rejectWithValue('Get user from db in sign-in stage failed');
    return;
  }

  return userInDb;
});

export const signUp = createAsyncThunk(SIGN_UP, async (data: SignUpData, thunkAPI) => {
  const user = await authService.signUp(data);

  if (!user) {
    thunkAPI.rejectWithValue('Sign up failed');
    return;
  }

  const userInDb = await userService.createUser({
    name: data.name,
    email: data.email,
    id: user.uid,
    img: '',
  });

  if (!userInDb) {
    thunkAPI.rejectWithValue('Set user to db in sign-up stage failed');
    return;
  }

  return userInDb;
});

export const signOut = createAsyncThunk(SIGN_OUT, async (data, thunkAPI) => {
  const isSignedOut = await authService.signOut();

  if (!isSignedOut) {
    thunkAPI.rejectWithValue('Sign out failed');
  }

  return isSignedOut;
});

export const getUser = createAsyncThunk(GET_USER, async (data, thunkAPI) => {
  const user = await userService.getUser();

  if (!user) {
    thunkAPI.rejectWithValue('Get user data failed');
  }

  return user;
});
