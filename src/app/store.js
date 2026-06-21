import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResultsSlice';

export const store = configureStore({
  reducer: {
    searchResults: searchResultsReducer,
  },
});