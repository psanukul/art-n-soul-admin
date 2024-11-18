import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../Service/axiosintercepter";

export const CreatePhotography = createAsyncThunk(
  "CreatePhotography", // Fixed typo in action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/photography",
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
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const GetPhotography = createAsyncThunk(
  "GetPhotography", // Fixed typo in action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        "/photography"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const getDataById = createAsyncThunk(
  "getDataById",
  async ({ id }, { rejectWithValue }) => {
    console.log("jhgikujhk", id);
    try {
      const response = await instance.get(
        `/photography/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const updatePhotography = createAsyncThunk(
  "updatePhotography",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("hf", id, formData);
    try {
      const response = await instance.put(
        `/photography/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const uploadPhotographyImages = createAsyncThunk(
  "photographyImages/upload",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/photography/images/${id}`,
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
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const nextPagePhotography = createAsyncThunk(
  "nextPagePhotography/fetchData",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await instance.get("/photography" , {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);


export const deletephotographyById = createAsyncThunk(
  "photography/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/photography/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);


export const deleteMediaById = createAsyncThunk(
  "deleteMediaById/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/media/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);  


  