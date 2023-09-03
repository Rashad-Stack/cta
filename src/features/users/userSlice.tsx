import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { UserTypes, rootState } from "../../types";

const initialState = {
  users: [] as UserTypes[],
  currentUser: {} as UserTypes,
  isLoggedIn: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser(state, action) {
      const { name, email, password } = action.payload;
      const user: UserTypes = {
        id: uuidv4(),
        name,
        email,
        password,
        bio: "",
        image: "",
        teamId: [],
        assignedTasks: [],
      };

      const isUserExist = state.users.find((user) => user.email === email);

      if (isUserExist) return;

      state.users.push(user);
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    login(state, action) {
      const { email, password } = action.payload;
      const user: UserTypes = state.users.find(
        (user) => user.email === email && user.password === password,
      )!;
      if (!user) return;

      state.currentUser = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.currentUser = {} as UserTypes;
      state.isLoggedIn = false;
    },
    updateUser(state, action) {
      const { id, name, bio, image } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (!user) return;
      user.name = name;
      user.bio = bio;
      user.image = image;

      state.currentUser = user;
    },
    addToTeam(state, action) {
      const { userId, teamId } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (!user) return;
      user?.teamId?.push(teamId);
      state.currentUser.teamId?.push(teamId);
    },
    removeFromTeam(state, action) {
      const { userId, teamId } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (!user) return;
      user.teamId = user.teamId?.filter((id) => id !== teamId);
      state.currentUser.teamId = state.currentUser.teamId?.filter(
        (id) => id !== teamId,
      );
    },
  },
});

export const {
  createUser,
  login,
  logout,
  updateUser,
  addToTeam,
  removeFromTeam,
} = usersSlice.actions;
export default usersSlice.reducer;

export const usersSelector = (state: rootState) => state.users.users;
