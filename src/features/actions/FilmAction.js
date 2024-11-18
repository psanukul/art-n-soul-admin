import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../Service/axiosintercepter";

export const CreateFilm = createAsyncThunk(
  "Film/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/film",
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

export const getFilms = createAsyncThunk(
  "Film/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/film");
      return response.data;
    } catch (error) {
      console.log("erro -----> ",error);
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const getNextPageFilms = createAsyncThunk(
  "nextPageFilms/fetch",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await instance.get("/film", {
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

export const updateFilm = createAsyncThunk(
  "Film/update",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("hf", id);
    try {
      const response = await instance.put(
        `/film/${id}`,
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

export const getDataById = createAsyncThunk(
  "getDataById/film",
  async ({ id }, { rejectWithValue }) => {
    console.log("hf", id);
    try {
      const response = await instance.get(
        `/film/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);

export const deleteFilmById = createAsyncThunk(
  "film/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/film/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Something went wrong");
    }
  }
);
