import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './Slices/photographySlice'; // Adjust the path based on your folder structure

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export default store;
