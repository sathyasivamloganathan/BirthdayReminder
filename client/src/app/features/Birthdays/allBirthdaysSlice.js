import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../apiConfig";

export const fetchAllBirthdays = createAsyncThunk(
  "allBirthdays/fetchUpcomingBirthdays",
  async (token) => {
    console.log("upcoming called");
    const res = await axios.get(`${API_URL}/api/getBirthdaysAdded`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const initialState = {
  allBirthdays: [],
  status: "idle",
  error: null,
};
export const allBirthdaysSlice = createSlice({
  name: "allBirthdays",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllBirthdays.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllBirthdays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allBirthdays = action.payload.processedBirthdays;
      })
      .addCase(fetchAllBirthdays.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const getAllBirthdays = (state) => state.allBirthdays.allBirthdays;
export const getAllBirthdaysStatus = (state) => state.allBirthdays.status;
export const {} = allBirthdaysSlice.actions;
export default allBirthdaysSlice.reducer;
