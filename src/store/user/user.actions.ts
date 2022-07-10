import {createAsyncThunk} from "@reduxjs/toolkit";

// actions
import {changeProfileAvatar, changeProfileField} from "../profile/profile.actions";

// action types
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_USER,
  UPLOAD_USER_AVATAR,
  DELETE_USER_AVATAR,
  CHANGE_USER_FIELD,
  CHANGE_USER_EMAIL,
} from "./user.actionTypes";

// services
import authService from "../../services/authService";
import userService from "../../services/userService";

// types
import {SignInData, SignUpData} from "../../types/UserInput";
import {IUpdateUserFieldData} from "../../types/User";

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

  return await userService.createUser({
    name: data.name,
    email: data.email,
    id: user.uid,
    img: '',
  });
});

export const signOut = createAsyncThunk(SIGN_OUT, async () => {
  await authService.signOut();
});

export const getUser = createAsyncThunk(GET_USER, async (data, thunkAPI) => {
  const user = await userService.getUser();

  if (!user) {
    thunkAPI.rejectWithValue('Get user data failed');
  }

  return user;
});

export const changeUserField = createAsyncThunk<IUpdateUserFieldData, IUpdateUserFieldData>(CHANGE_USER_FIELD, async (data, thunkAPI) => {
  await userService.changeUserField(data.name, data.value);

  thunkAPI.dispatch(changeProfileField(data));

  return data;
});

export const changeUserEmail = createAsyncThunk<string, string>(CHANGE_USER_EMAIL, async (data, thunkAPI) => {
  await authService.changeEmail(data);
  await userService.changeUserField('email', data);

  thunkAPI.dispatch(changeProfileField({name: 'email', value: data}));

  return data;
});

export const uploadUserAvatar = createAsyncThunk<string, string>(UPLOAD_USER_AVATAR, async (data, thunkAPI) => {
  const img = await userService.uploadUserAvatar(data);

  thunkAPI.dispatch(changeProfileAvatar(img));

  return img;
});

export const deleteUserAvatar = createAsyncThunk(DELETE_USER_AVATAR, async (data, thunkAPI) => {
  await userService.deleteUserAvatar();

  thunkAPI.dispatch(changeProfileAvatar(''));
});
