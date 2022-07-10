import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

// services
import userService from "../../services/userService";
import memoriesService from "../../services/memoriesService";

// action types
import {
  GET_PROFILE,
  RESET_PROFILE,
  GET_PROFILE_MEMORIES,
  CHANGE_PROFILE_AVATAR,
  CHANGE_PROFILE_FIELD,
} from "./profile.actionTypes";

// utils
import collectionToArray from "../../utils/collectionToArray";

// types
import User, {IUpdateUserFieldData} from "../../types/User";
import Memory from "../../types/Memory";
import {RootState} from "../store";

export const getProfile = createAsyncThunk<User, string, {state: RootState}>(GET_PROFILE, async (data, thunkAPI) => {
  const {user: me} = thunkAPI.getState();

  if (me.id === data) {
    return me;
  }

  const user = await userService.getUser(data);

  if (!user) {
    throw new Error('Get user failed');
  }

  return user;
});

export const getProfileMemories = createAsyncThunk<Memory[], string, {state: RootState}>(GET_PROFILE_MEMORIES, async (data, thunkAPI) => {
  const memories = await memoriesService.getUserMemories(data);

  const {profile} = thunkAPI.getState();

  return collectionToArray<Memory>(memories, (item) => {
    item.user = profile.user;
  });
});

export const resetProfile = createAction(RESET_PROFILE);

export const changeProfileAvatar = createAction<string>(CHANGE_PROFILE_AVATAR);

export const changeProfileField = createAction<IUpdateUserFieldData>(CHANGE_PROFILE_FIELD);
