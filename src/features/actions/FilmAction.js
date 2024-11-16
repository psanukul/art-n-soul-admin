import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateFilm = createAsyncThunk(
  "CreateFilm",
  async (formData, { rejectWithValue }) => {
    try {
      console.log('im here create', formData)
      const response = await axios.post(
        "http://localhost:8000/api/v1/film",
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

export const getFilms = createAsyncThunk(
  "getFilms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/film");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);

export const getNextPageFilms = createAsyncThunk(
  "nextPageFilms/fetchData",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/film", {
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

export const updateFilm = createAsyncThunk(
  "updateFilm",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("hf", id);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/film/${id}`,
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

export const getDataById = createAsyncThunk(
  "getDataById/film",
  async ({ id }, { rejectWithValue }) => {
    console.log("hf", id);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/film/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteFilmById = createAsyncThunk(
  "film/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/film/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
