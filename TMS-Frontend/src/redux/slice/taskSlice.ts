import { createSlice } from "@reduxjs/toolkit";
import {
  assignTaskToUser,
  createTask,
  deleteTask,
  fetchTaskById,
  fetchTasks,
  fetchUsersTasks,
  updateTask,
} from "../../services/TaskService";
import { taskInitialState } from "../types";

const initialState: taskInitialState = {
  tasks: [],
  loading: false,
  error: null,
  taskDetails: null,
  userTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(fetchTaskById.pending, (state, action) => {
      //TODO: Need to implement loading for fetching.
      // })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.taskDetails = action.payload;
      })
      .addCase(fetchUsersTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(fetchUsersTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateTask.fulfilled, (state, action: any) => {
        const updateTask = action.payload;
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === updateTask.id ? { ...task, ...updateTask } : task
        );
      })

      .addCase(assignTaskToUser.fulfilled, (state, action) => {
        const newTask = action.payload;
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === newTask.id ? { ...task, ...newTask } : task
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
