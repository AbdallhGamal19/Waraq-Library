import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  response: [],
  error: "",
};
export const fetchData = createAsyncThunk(
  "requestData/fetchUsers",
  async ({ formData, endPoint, method }) => {
    if (method === "post") {
      return await axios
        .post(`http://localhost:5001/${endPoint}`, formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          return response.data;
        });
    }
    return await axios
      .get(`http://localhost:5001/${endPoint}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        return response.data;
      });
  }
);
const requestSlice = createSlice({
  name: "requestData",
  initialState,
  reducers: {
    clearUser(state) {
      state.response = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { clearUser } = requestSlice.actions;
export default requestSlice.reducer;
