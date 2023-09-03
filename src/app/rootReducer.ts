import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import darkModeReducer from "../features/darkMode/darkModeSlice";
import taskReducer from "../features/task/taskSlice";
import teamReducer from "../features/team/teamSlice";
import userReducer from "../features/users/userSlice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  users: userReducer,
  tasks: taskReducer,
  teams: teamReducer,
});

export default persistReducer(persistConfig, rootReducer);
