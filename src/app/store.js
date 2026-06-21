import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResultsSlice';
import spaceImagesReducer from '../features/spaceImagesSlice';

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
    spaceImages: spaceImagesReducer,
  },
});