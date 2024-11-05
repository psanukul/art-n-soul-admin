import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreatePhotography = createAsyncThunk(
  "CreatePhotography", // Fixed typo in action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/photography",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);

export const GetPhotography = createAsyncThunk(
  "GetPhotography", // Fixed typo in action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/photography"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);

export const getDataById = createAsyncThunk(
  "getDataById",
  async ({ id }, { rejectWithValue }) => {
    console.log("jhgikujhk", id);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/photography/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updatePhotography = createAsyncThunk(
  "updatePhotography",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("hf", id, formData);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/photography/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const uploadPhotographyImages = createAsyncThunk(
  "photographyImages/upload",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/photography/images/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const nextPagePhotography = createAsyncThunk(
  "nextPagePhotography/fetchData",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/photography" , {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);


export const deletephotographyById = createAsyncThunk(
  "photography/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/photography/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

  