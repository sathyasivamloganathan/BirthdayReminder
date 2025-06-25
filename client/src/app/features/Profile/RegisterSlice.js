import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../apiConfig";
import axios from "axios";

export const registerApi = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        name: formData.name,
        dob: formData.dob,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  register: [],
  status: "idle",
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerApi.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.register = action.payload;
        state.status = "succeeded";
      })
      .addCase(registerApi.rejected, (state, action) => {
        (state.status = "rejected"), (state.error = action.error.message);
      });
  },
});

export const getRegisterStatus = (state) => state.register.status;
export default registerSlice.reducer;
