import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  CreatePhotography,
  deletephotographyById,
  getDataById,
  GetPhotography,
  nextPagePhotography,
  updatePhotography,
} from "../actions/photographyAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  photographyData: [],
  errorMessage: "",
  isDeleted: false,
};

export const photographySlice = createSlice({
  name: "photographySlice",
  initialState,
  reducers: {
    clearIsSuccess: (state) => {
      state.isSuccess = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreatePhotography.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(CreatePhotography.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.photographyData = action.payload;
      })
      .addCase(CreatePhotography.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
        toast.error(state.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(GetPhotography.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetPhotography.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.photographyData = action.payload;
      })
      .addCase(GetPhotography.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
        toast.error(state.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(getDataById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.photographyData = action.payload;
      })
      .addCase(getDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
        toast.error(state.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(nextPagePhotography.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(nextPagePhotography.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.photographyData = {
          ...state.photographyData,
          Photographies: [
            ...state.photographyData?.Photographies,
            ...action.payload?.Photographies,
          ],
        };
      })
      .addCase(nextPagePhotography.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
        toast.error(state.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(updatePhotography.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updatePhotography.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.photographyData = action.payload;
      })
      .addCase(updatePhotography.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
        toast.error(state.errorMessage, {
          position: "top-center",
        });
      })
      .addCase(deletephotographyById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deletephotographyById.fulfilled, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deletephotographyById.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      
  },
});

export const { clearIsSuccess } = photographySlice.actions;
export default photographySlice.reducer;
