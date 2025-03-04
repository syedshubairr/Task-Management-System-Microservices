import { createSlice } from "@reduxjs/toolkit";
import { submissionInitialState } from "../types";
import {
  acceptDeclineSubmission,
  fetchAllSubmissions,
  fetchSubmissionByTaskId,
  submitTask,
} from "../../services/SubmissionService";

const initialState: submissionInitialState = {
  error: null,
  status: "PENDING",
  submissions: [],
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.submissions.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      })

      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.submissions = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      })

      .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissionByTaskId.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      })

      .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
        state.status = "SUCCEEDED";
        state.submissions = state.submissions.map((item) =>
          item.id !== action.payload.id ? item : action.payload
        );
      });
  },
});

export default submissionSlice.reducer;
