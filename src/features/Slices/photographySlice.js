import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { redirect } from "react-router-dom";
import {
  CreatePhotography,
  getDataById,
  GetPhotography,
  updatePhotography,
  uploadPhotographyImages,
  nextPagePhotography,
  deletephotographyById,
  deleteMediaById,
} from "../actions/photographyAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  photographyData: [],
  errorMessage: "",
  isdeleted: false,
  isSidebarOpen: false
};

export const photographySlice = createSlice({
  name: "photographySlice",
  initialState,
  reducers: {
    clearIsSuccess: (state) => {
      (state.isSuccess = false), (state.isdeleted = false);
    },
    toggleSideBar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreatePhotography.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(CreatePhotography.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = ""),
          (state.photographyData = action.payload);
      })
      .addCase(CreatePhotography.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })
      .addCase(GetPhotography.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(GetPhotography.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = ""),
          (state.photographyData = action.payload);
      })
      .addCase(GetPhotography.rejected, (state, action) => {
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
          (state.photographyData = action.payload);
      })
      .addCase(getDataById.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })
      .addCase(updatePhotography.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(updatePhotography.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = ""),
          (state.photographyData = action.payload);
      })
      .addCase(updatePhotography.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })

      .addCase(deleteMediaById.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(deleteMediaById.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = "");
      })
      .addCase(deleteMediaById.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      })
      .addCase(uploadPhotographyImages.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.errorMessage = "");
      })
      .addCase(uploadPhotographyImages.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.errorMessage = "");
      })
      .addCase(uploadPhotographyImages.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          toast.error(action?.payload || "Something went wrong", {
            position: "top-center",
          });
      });
  },
});

export const { clearIsSuccess, toggleSideBar } = photographySlice.actions;
export default photographySlice.reducer;
