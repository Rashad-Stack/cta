import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TaskTypes, rootState } from "../../types";

const initialState = {
  tasks: [] as TaskTypes[],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask(state, action) {
      const { title, description, assigned, userId, dueDate, priority } =
        action.payload;
      const task = {
        id: uuidv4(),
        userId,
        title,
        description,
        status: "",
        teamId: "",
        dueDate,
        priority: priority || "Low",
        assigned: assigned || [],
      };

      state.tasks.push(task as TaskTypes);
    },

    duplicateTask(state, action) {
      const id = action.payload;

      const referTask = state.tasks.find((task) => task.id === id);

      if (!referTask) return;
      const {
        title,
        description,
        teamId,
        assigned,
        userId,
        dueDate,
        priority,
      } = referTask;
      const task = {
        id: uuidv4(),
        userId,
        title: `Copy of ${title}`,
        description,
        status: "New",
        dueDate,
        teamId,
        priority,
        assigned: assigned || [],
      };
      state.tasks.push(task as TaskTypes);
    },

    updateTask(state, action) {
      const { id, task } = action.payload;
      const referTask = state.tasks.find((task) => task.id === id);
      if (!referTask) return;
      referTask.title = task.title;
      referTask.description = task.description;
      referTask.status = task.status;
      referTask.assigned = task.assigned;
      referTask.dueDate = task.dueDate;
      referTask.priority = task.priority;
    },

    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    assignTask(state, action) {
      const { taskId, userId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (!task) return;
      task.assigned.push(userId);
    },
    assignTeam(state, action) {
      const { taskId, teamId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (!task) return;
      task.teamId = teamId;
    },
    removeTeam(state, action) {
      const task = state.tasks.find((task) => task.teamId === action.payload);
      if (!task) return;
      task.teamId = "";
    },
    removeAssignTask(state, action) {
      const { userId, teamId } = action.payload;
      const task = state.tasks.find((task) => task.teamId === teamId);
      if (!task) return;
      task.assigned = task.assigned.filter((id) => id !== userId);
    },
  },
});

export const {
  createTask,
  deleteTask,
  duplicateTask,
  updateTask,
  assignTask,
  assignTeam,
  removeTeam,
  removeAssignTask,
} = taskSlice.actions;
export default taskSlice.reducer;

// selecting task based on current logged in user
export const taskSelectors = (state: rootState) => {
  const { currentUser } = state.users;
  return state.tasks.tasks.filter((task) => task.userId === currentUser!.id);
};

// selecting assigned task for current logged in user
export const assignedTasks = (state: rootState) => {
  return state.tasks.tasks.filter((task) =>
    task.assigned.includes(state.users.currentUser!.id),
  );
};

// selecting all task
export const allTaskSelector = (state: rootState) => state.tasks.tasks;
