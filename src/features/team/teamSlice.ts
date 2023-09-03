import { createSlice } from "@reduxjs/toolkit";
import { TeamTypes, rootState } from "../../types";

const initialState = {
  teams: [] as TeamTypes[],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam(state, action) {
      const { teamName, id, userId } = action.payload;
      const newTeam: TeamTypes = {
        id,
        teamName,
        userId: [userId],
      };
      state.teams.push(newTeam);
    },
    addMember(state, action) {
      const { userId, teamId } = action.payload;
      const team = state.teams.find((team) => team.id === teamId);
      if (!team) return;
      team.userId.push(userId);
    },
    removeMember(state, action) {
      const { userId, teamId } = action.payload;
      const team = state.teams.find((team) => team.id === teamId);
      if (!team) return;
      team.userId = team.userId.filter((id) => id !== userId);
    },
    deleteTeam(state, action) {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },
  },
});

export const { addTeam, addMember, removeMember, deleteTeam } =
  teamSlice.actions;
export default teamSlice.reducer;

export const teamsSelector = (state: rootState) => state.teams.teams;
