/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../apiClient";
import { taskDataType } from "./types";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async ({ status }: { status?: string | null }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.get("/api/task", {
        params: { status },
      });
      return data;
    } catch (error: any) {
      console.log("error: ", error.response.data);
      throw Error(error.response.data.error);
    }
  }
);

export const fetchUsersTasks = createAsyncThunk(
  "task/fetchUsersTasks",
  async ({ status }: { status?: string | null }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.get("api/task/user", {
        params: { status },
      });
      console.log("fetch users tasks: ", data);
      return data;
    } catch (error: any) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "task/fetchTaskById",
  async ({ taskId }: { taskId: number }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.get(`api/task/${taskId}`);
      return data;
    } catch (error: any) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData: taskDataType) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.post(`api/task`, taskData);
      return data;
    } catch (error: any) {
      console.log("error: ", error.response);
      throw Error(error.response.data.error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({
    id,
    updateTaskData,
  }: {
    id: number;
    updateTaskData: taskDataType;
  }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.put(`api/task/${id}`, updateTaskData);
      console.log("updated tasks", data);
      return data;
    } catch (error: any) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const assignTaskToUser = createAsyncThunk(
  "task/assignTaskToUser",
  async ({ taskId, userId }: { taskId: number; userId: number }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.put(
        `api/task/${taskId}/user/${userId}/assigned`
      );
      console.log("assign Task To User: ", data);
      return data;
    } catch (error: any) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
      const { data } = await api.delete(`api/task/${taskId}`);
      console.log("delete Task done", data);
      return taskId;
    } catch (error: any) {
      console.log("error: ", error);
      throw Error(error.response.data.error);
    }
  }
);
