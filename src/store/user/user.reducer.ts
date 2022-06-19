import {createReducer} from "@reduxjs/toolkit";

// actions
import {getUser, signIn, signOut, signUp} from "./user.actions";

// types
import User from "../../types/User";

const initialState: User = {
  id: '',
  name: '',
  email: '',
  img: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.fulfilled, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
  builder.addCase(signOut.fulfilled, () => {
    return initialState;
  });
  builder.addCase(getUser.fulfilled, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
  builder.addDefaultCase((state) => state);
});

export default userReducer;
