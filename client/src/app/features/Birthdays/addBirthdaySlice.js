import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../apiConfig";
import axios from "axios";

export const addBirthdaysApi = createAsyncThunk(
  "addBirthdaysApi",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/addBirthday`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;   
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const deleteBirthdayApi = createAsyncThunk( "deleteBirthdayApi", async({id, token}, {rejectWithValue}) => {
  try {
    const res = await axios.delete(`${API_URL}/api/deleteBirthdayAdded/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.res.data)
  }
})

const initialState = {
  addBirthday: [],
  addStatus: "idle",
  delStatus: "idle",
  error: null,
};

const birthdayActionsSlice = createSlice({
  name: "birthday",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addBirthdaysApi.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addBirthdaysApi.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
      })
      .addCase(addBirthdaysApi.rejected, (state, action) => {
        state.addStatus = "rejected", 
        state.error = action.error.message;
      })

      .addCase(deleteBirthdayApi.pending, (state, action) => {
        state.delStatus = "loading";
      })
      .addCase(deleteBirthdayApi.fulfilled, (state, action) => {
        state.delStatus = "succeeded";
      })
      .addCase(deleteBirthdayApi.rejected, (state, action) => {
        (state.delStatus = "rejected"), (state.error = action.error.message);
      })
  },
});

export const getAddBirthdayStatus = (state) => state.birthdayActions.addStatus;
export const getDeleteBirthdayStatus = (state) => state.birthdayActions.delStatus;
export default birthdayActionsSlice.reducer;