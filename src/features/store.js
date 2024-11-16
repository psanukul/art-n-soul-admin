import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./Slices/photographySlice"; // Adjust the path based on your folder structure
import FilmsSlices from "./Slices/FilmsSlices";
import photographySlice from "./Slices/photographySlice";
import globalSlice  from "./Slices/globalSlice";

const store = configureStore({
  reducer: {
    photography: photographySlice,
    Films: FilmsSlices,
    global: globalSlice
  },
});

export default store;
