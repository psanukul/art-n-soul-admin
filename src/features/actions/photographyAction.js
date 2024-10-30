import{createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreatePhotography = createAsyncThunk(
    "CreatePhotography", // Fixed typo in action type
    async (  formData , { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/photography", formData, {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response || "Something went wrong");
      }
    }
  );