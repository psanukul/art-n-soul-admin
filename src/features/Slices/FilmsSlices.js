import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import { CreateFilm, getDataById, getFilms, updateFilm } from "../actions/FilmAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  FilmData: [],
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
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(CreateFilm.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = "");
      })
      .addCase(CreateFilm.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })
      .addCase(getFilms.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = ""),
          (state.FilmData = action.payload);
      })
      .addCase(getFilms.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })

      .addCase(getDataById.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })

      .addCase(getDataById.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = ""),
          (state.FilmData = action.payload);
      })

      .addCase(getDataById.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })
      .addCase(updateFilm.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(updateFilm.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = "");
      })
      .addCase(updateFilm.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      });
  },
});

export const { clearIsSuccess } = FilmSlices.actions;
export default FilmSlices.reducer;
