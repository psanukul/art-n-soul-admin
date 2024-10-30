import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './Slices/photographySlice'; // Adjust the path based on your folder structure
import FilmsSlices from './Slices/FilmsSlices';

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    Films:FilmsSlices

    
      


  },
});

export default store;
