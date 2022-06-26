import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

// action types
import {
  GET_MEMORIES,
  ADD_MEMORY,
  DELETE_MEMORY,
  GET_MEMORY_USER,
  SET_MEMORY_USER,
  REFRESH_MEMORIES,
  UPDATE_LAST,
} from "./memories.actionTypes";

// services
import memoriesService from "../../services/memoriesService";
import userService from "../../services/userService";

// utils
import collectionToArray from "../../utils/collectionToArray";

// types
import Memory from "../../types/Memory";
import {MemoryData} from "../../types/UserInput";
import {RootState} from "../store";

export const getMemories = createAsyncThunk<Memory[], void, {state: RootState}>(GET_MEMORIES, async (data, thunkAPI) => {
  const { user, memories } = thunkAPI.getState();

  const response = await memoriesService.getMemories(memories.last);

  thunkAPI.dispatch(updateLast(response[response.length - 1]));

  return collectionToArray<Memory>(response, (item) => {
    if (user.id === item.uid) {
      item.user = user;
      return;
    }

    thunkAPI.dispatch(getMemoryUser(item));
  });
});

export const refreshMemories = createAsyncThunk<Memory[], void, {state: RootState}>(REFRESH_MEMORIES, async (data, thunkAPI) => {
  const { user } = thunkAPI.getState();

  const response = await memoriesService.getMemories();

  thunkAPI.dispatch(updateLast(response[response.length - 1]));

  return collectionToArray<Memory>(response, (item) => {
    if (user.id === item.uid) {
      item.user = user;
      return;
    }

    thunkAPI.dispatch(getMemoryUser(item));
  });
});

export const addMemory = createAsyncThunk<Memory, MemoryData, {state: RootState}>(ADD_MEMORY, async (data, thunkAPI) => {
  const memory = await memoriesService.createMemory(data);

  const {user} = thunkAPI.getState();

  return { ...memory, user };
});

export const getMemoryUser = createAsyncThunk(GET_MEMORY_USER, async (memory: Memory) => {
  const user = await userService.getUser(memory.uid);

  if (!user) {
    throw new Error('Get user from memory failed');
  }

  return { id: memory.id, user };
});

export const updateLast = createAction<any>(UPDATE_LAST);
