import {createReducer} from "@reduxjs/toolkit";

// actions
import {
  getProfile,
  getProfileMemories,
  resetProfile,
  changeProfileAvatar, changeProfileField,
} from "./profile.actions";

// types
import User from "../../types/User";
import Memory from "../../types/Memory";

interface State {
  user?: User;
  memories: Memory[];
  loading: boolean;
  error: boolean;
  memoriesLoading: boolean;
  memoriesError: boolean;
}

const initialState: State = {
  memories: [],
  loading: false,
  error: false,
  memoriesLoading: false,
  memoriesError: false,
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(getProfile.fulfilled, (state, {payload}) => {
    state.user = payload;
    state.loading = false;
    state.error = false;
  });
  builder.addCase(getProfile.rejected, (state) => {
    state.user = undefined;
    state.loading = false;
    state.error = true;
  });
  builder.addCase(getProfile.pending, (state) => {
    state.loading = true;
    state.error = false;
  });
  builder.addCase(getProfileMemories.fulfilled, (state, {payload}) => {
    state.memories = payload;
    state.memoriesLoading = false;
    state.memoriesError = false;
  });
  builder.addCase(getProfileMemories.pending, (state) => {
    state.memoriesLoading = true;
    state.memoriesError = false;
  });
  builder.addCase(getProfileMemories.rejected, (state) => {
    state.memoriesLoading = false;
    state.memoriesError = true;
  });
  builder.addCase(resetProfile, () => initialState);
  builder.addCase(changeProfileAvatar, (state, {payload}) => {
    if (state.user) {
      state.user.img = payload;
    }

    state.memories.forEach((memory) => {
      if (memory.user) {
        memory.user.img = payload;
      }
    });
  });
  builder.addCase(changeProfileField, (state, {payload}) => {
    if (state.user) {
      state.user[payload.name] = payload.value;
    }

    state.memories.forEach((memory) => {
      if (memory.user) {
        memory.user[payload.name] = payload.value;
      }
    });
  });
  builder.addDefaultCase((state) => state);
});
