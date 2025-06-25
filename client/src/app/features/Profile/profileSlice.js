import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../apiConfig";

export const fetchProfileDetails = createAsyncThunk(
  "profile/fetchProfile",
  async (token) => {
    console.log("fetch started");
    const res = await axios.get(`${API_URL}/api/auth/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Slice: ", res);
    return res.data;
  }
);

export const updateProfileDetailsApi = createAsyncThunk(
  "profile/updateProfile",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/auth/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Redux: ", res.data)
      return res.data.updatedUser;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

const initialState = {
  profile: {},
  status: "idle",
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = {};
      state.status = "idle";
      state.error = null;
    },
    updateDOB: (state, action) => {
      if(!action.payload) return;
      state.profile = {...state.profile, dob: action.payload};
      
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(updateProfileDetailsApi.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfileDetailsApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfileDetailsApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.error.message;
      });
  },
});

export const getProfileDetails = (state) => state.getprofile.profile;
export const getProfileStatus = (state) => state.getprofile.status;
export const { clearProfile, updateDOB } = profileSlice.actions;
export default profileSlice.reducer;
