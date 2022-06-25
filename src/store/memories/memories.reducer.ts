import {createReducer} from "@reduxjs/toolkit";

// actions
import {
  addMemory,
  getMemories,
  getMemoryUser,
  refreshMemories,
} from "./memories.actions";

// types
import Memory from "../../types/Memory";

interface State {
  memories: Memory[];
  loading: boolean;
  error: boolean;
  refreshing: boolean;
}

const initialState: State = {
  memories: [],
  loading: true,
  error: false,
  refreshing: false,
};

const memoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getMemories.fulfilled, (state, action) => {
    state.memories = action.payload;
    state.loading = false;
    state.error = false;
  });
  builder.addCase(getMemories.pending, (state) => {
    state.loading = true;
    state.error = false;
  });
  builder.addCase(getMemories.rejected, (state) => {
    state.loading = false;
    state.error = true;
  });
  builder.addCase(refreshMemories.fulfilled, (state, action) => {
    state.memories = action.payload;
    state.refreshing = false;
  });
  builder.addCase(refreshMemories.pending, (state) => {
    state.refreshing = true;
  });
  builder.addCase(refreshMemories.rejected, (state) => {
    state.refreshing = false;
  });
  builder.addCase(addMemory.fulfilled, (state, action) => {
    state.memories = [action.payload, ...state.memories];
  });
  builder.addCase(getMemoryUser.fulfilled, (state, action) => {
    for (const value of state.memories) {
      if (value.id === action.payload.id) {
        value.user = action.payload.user;
        break;
      }
    }
  });
  builder.addDefaultCase((state) => state);
});

export default memoriesReducer;
