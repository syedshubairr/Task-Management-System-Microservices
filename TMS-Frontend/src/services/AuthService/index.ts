import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../apiClient";
import { authResponse, registerProps, userDataType } from "./types";

export const login = createAsyncThunk(
  "auth/login",
  async (userData: userDataType) => {
    try {
      const { data }: { data: authResponse } = await api.post(
        "/auth/login",
        userData
      );
      localStorage.setItem("jwt", data.jwt);
      console.log("Login response", data);
      return data;
    } catch (error) {
      console.error("Login Response Error", error);
      throw Error(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/signup",
  async (registerData: registerProps) => {
    try {
      const { data }: { data: authResponse } = await api.post(
        "/auth/signup",
        registerData
      );
      localStorage.setItem("jwt", data.jwt);
      return data;
    } catch (error) {
      console.log("Register Response Error", error);
      throw Error(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log("logout Response Error", error);
    throw Error(error.response.data.message);
  }
});

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (jwt: string) => {
    setAuthHeader(jwt, api);
    try {
      const data = await api.get("/api/users/profile");
      return data;
    } catch (error) {
      console.log("Get Profile Error", error);
      localStorage.removeItem("jwt");
      throw Error(error.response.data.message);
    }
  }
);

export const getUsersList = createAsyncThunk(
  "auth/getUserList",
  async (jwt: string | null) => {
    if (jwt === null) {
      console.log("JWT NOT HERE");
    }
    setAuthHeader(jwt, api);
    try {
      const data = await api.get("/api/users");
      console.log("Get User List Success", data);
      return data;
    } catch (error) {
      console.log("Get User List Error", error);
      throw Error(error.response.data.message);
    }
  }
);
