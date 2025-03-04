import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authSlice from "./slice/authSlice";
import taskSlice from "./slice/taskSlice";
import submissionSlice from "./slice/submissionSlice";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice,
  submission: submissionSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
