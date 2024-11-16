import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadGridImage = createAsyncThunk(
  "gridImages/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/global/image-grid",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);

export const getGridItems = createAsyncThunk(
  "gridImages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/global/image-grid"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);
