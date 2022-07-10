import {createReducer} from "@reduxjs/toolkit";

// actions
import {
  deleteUserAvatar,
  getUser,
  signIn,
  signOut,
  signUp,
  uploadUserAvatar,
  changeUserField,
  changeUserEmail,
} from "./user.actions";

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
  builder.addCase(uploadUserAvatar.fulfilled, (state, action) => {
    state.img = action.payload;
  });
  builder.addCase(deleteUserAvatar.fulfilled, (state) => {
    state.img = '';
  });
  builder.addCase(changeUserField.fulfilled, (state, action) => {
    state[action.payload.name] = action.payload.value;
  });
  builder.addCase(changeUserEmail.fulfilled, (state, action) => {
    state.email = action.payload;
  });
  builder.addDefaultCase((state) => state);
});

export default userReducer;
