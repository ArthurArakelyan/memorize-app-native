import {AsyncThunkPayloadCreator, createAsyncThunk} from "@reduxjs/toolkit";

// action types
import {
  GET_MEMORIES,
  ADD_MEMORY,
  DELETE_MEMORY,
  GET_MEMORY_USER,
  SET_MEMORY_USER,
  REFRESH_MEMORIES,
} from "./memories.actionTypes";

// services
import memoriesService from "../../services/memoriesService";
import userService from "../../services/userService";

// utils
import transformObjectToArray from "../../utils/transformObjectToArray";

// types
import Memory from "../../types/Memory";
import {MemoryData} from "../../types/UserInput";
import {RootState} from "../store";

const getMemoriesPayloadCreator: AsyncThunkPayloadCreator<Memory[], void, {state: RootState}> = async (data, thunkAPI) => {
  const memories = await memoriesService.getMemories();

  if (memories === undefined) {
    throw new Error('Get memories failed');
  }

  return memories ? transformObjectToArray<Memory>(memories, (memory) => {
    const {user} = thunkAPI.getState();

    if (user.id === memory.uid) {
      memory.user = user;
      return;
    }

    thunkAPI.dispatch(getMemoryUser(memory));
  }) : [];
}

export const getMemories = createAsyncThunk<Memory[], void, {state: RootState}>(GET_MEMORIES, getMemoriesPayloadCreator);

export const refreshMemories = createAsyncThunk<Memory[], void, {state: RootState}>(REFRESH_MEMORIES, getMemoriesPayloadCreator);

export const addMemory = createAsyncThunk<Memory, MemoryData, {state: RootState}>(ADD_MEMORY, async (data, thunkAPI) => {
  const memory = await memoriesService.createMemory(data);

  if (!memory) {
    throw new Error('Create new memory failed');
  }

  const {user} = thunkAPI.getState();

  return { ...memory, user };
});

export const getMemoryUser = createAsyncThunk(GET_MEMORY_USER, async (memory: Memory) => {
  const user = await userService.getUser(memory.uid);

  if (!user) {
    throw new Error('Get user from memory failed');
  }

  return {id: memory.id, user};
});
