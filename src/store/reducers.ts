import userReducer from "./user/user.reducer";
import memoriesReducer from "./memories/memories.reducer";

const reducers = {
  user: userReducer,
  memories: memoriesReducer,
};

export default reducers;
