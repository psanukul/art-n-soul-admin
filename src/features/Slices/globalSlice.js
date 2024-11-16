import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getGridItems } from "../actions/globalAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  gridImages: [],
  errorMessage: "",
  isdeleted: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGridItems.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getGridItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.gridImages = action.payload?.data;
      })
      .addCase(getGridItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      });
  },
});

export const {  } = globalSlice.actions;
export default globalSlice.reducer;
