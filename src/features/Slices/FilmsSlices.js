import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import {
  CreateFilm,
  deleteFilmById,
  getDataById,
  getFilms,
  getNextPageFilms,
  updateFilm,
} from "../actions/FilmAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  FilmData: [],
  singleFilmData: null,
  errorMessage: "",
  isdeleted: false,
};

export const FilmSlices = createSlice({
  name: "FilmSlices",
  initialState,
  reducers: {
    clearIsSuccess: (state) => {
      (state.isSuccess = false), (state.isdeleted = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateFilm.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(CreateFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(CreateFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })
      .addCase(getFilms.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.FilmData = action.payload;
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })
      .addCase(getDataById.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      .addCase(getDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.singleFilmData = action.payload;
      })

      .addCase(getDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })
      .addCase(updateFilm.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(updateFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })
      .addCase(getNextPageFilms.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getNextPageFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.FilmData = {
          ...state.FilmData,
          films: [...state.FilmData?.films, ...action.payload?.films],
        };
      })
      .addCase(getNextPageFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })
      .addCase(deleteFilmById.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteFilmById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
      })
      .addCase(deleteFilmById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      });
  },
});

export const { clearIsSuccess } = FilmSlices.actions;
export default FilmSlices.reducer;
