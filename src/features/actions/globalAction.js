import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../Service/axiosintercepter";

export const uploadGridImage = createAsyncThunk(
  "gridImages/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/global/image-grid",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const getGridItems = createAsyncThunk(
  "gridImages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        "/global/image-grid"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const deleteGridItem = createAsyncThunk(
  "gridImage/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/global/image-grid/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);