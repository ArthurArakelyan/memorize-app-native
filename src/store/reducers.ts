import userReducer from "./user/user.reducer";
import memoriesReducer from "./memories/memories.reducer";
import {profileReducer} from "./profile/profile.reducer";

const reducers = {
  user: userReducer,
  memories: memoriesReducer,
  profile: profileReducer,
};

export default reducers;
