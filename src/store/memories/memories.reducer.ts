import {createReducer} from "@reduxjs/toolkit";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

// actions
import {
  addMemory,
  getMemories,
  getMemoryUser,
  refreshMemories,
  updateLast,
} from "./memories.actions";

// types
import Memory from "../../types/Memory";

interface State {
  memories: Memory[];
  loading: boolean;
  error: boolean;
  refreshing: boolean;
  last?: FirebaseFirestoreTypes.QueryDocumentSnapshot<Memory>;
  endReached: boolean;
}

const initialState: State = {
  memories: [],
  loading: false,
  error: false,
  refreshing: false,
  endReached: false,
};

const memoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getMemories.fulfilled, (state, action) => {
    state.memories = [...state.memories, ...action.payload];
    state.loading = false;
    state.error = false;
  });
  builder.addCase(getMemories.pending, (state) => {
    state.loading = true;
    state.error = false;
  });
  builder.addCase(getMemories.rejected, (state) => {
    state.memories = [];
    state.loading = false;
    state.error = true;
  });
  builder.addCase(refreshMemories.fulfilled, (state, action) => {
    state.memories = action.payload;
    state.refreshing = false;
    state.endReached = false;
    state.error = false;
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
  builder.addCase(updateLast, (state, action) => {
    if (!action.payload) {
      state.endReached = true;
    }

    state.last = action.payload;
  });
  builder.addDefaultCase((state) => state);
});

export default memoriesReducer;
