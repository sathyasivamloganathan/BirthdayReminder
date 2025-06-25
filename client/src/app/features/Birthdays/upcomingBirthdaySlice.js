import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../apiConfig";
import axios from "axios";

export const fetchUpcomingBirthdays = createAsyncThunk(
  "upcomingBirthdays/fetchUpcomingBirthdays",
  async (token) => {
    const res = await axios.get(`${API_URL}/api/getUpcomingBirthdays`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
  }
);

const initialState = {
  upcoming: [],
  status: "idle",
  error: null,
};
export const upcomingBirthdaysSlice = createSlice({
  name: "upcomingBirthdays",
  initialState,
  reducer: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUpcomingBirthdays.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingBirthdays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcoming = action.payload.processedBirthdays;
      })
      .addCase(fetchUpcomingBirthdays.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const getUpcomingBirthdays = (state) => state.upcomingBirthdays.upcoming;
export const getUpcomingBirthdaysStatus = (state) => state.upcomingBirthdays.status;
export const {} = upcomingBirthdaysSlice.actions;
export default upcomingBirthdaysSlice.reducer;
