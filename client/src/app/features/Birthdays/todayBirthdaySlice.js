import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../apiConfig";


export const fetchTodayBirthdays = createAsyncThunk(
  "todayBirthdays",
  async (token) => {
    const res = await axios.get(`${API_URL}/api/todayBirthdays`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
	return res.data;
  }
);

const initialState = {
  todayBirthdays: [],
  status: "idle",
  error: null,
};

export const todayBirthdaysSlice = createSlice({
  name: "todayBirthdays",
  initialState,
  reducers: {},
  extraReducers(builder) {
	builder.addCase(fetchTodayBirthdays.pending, (state, action) => {
		state.status = "loading"
	})
	.addCase(fetchTodayBirthdays.fulfilled, (state, action) => {
		state.status = "succeeded";
		state.todayBirthdays = action.payload.todayBirthdays;
	})
	.addCase(fetchTodayBirthdays.rejected, (state, action) => {
		state.status = "rejected",
		state.error = action.error.message
	})
  }
});

export const getTodayBirthdays = (state) => state.todayBirthdays.todayBirthdays;
export const getTodayBirthdaysStatus = (state) => state.todayBirthdays.status;
export const {} = todayBirthdaysSlice.actions;
export default todayBirthdaysSlice.reducer;
