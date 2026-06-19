import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setLoading, setError } = resultsSlice.actions;

export const store = configureStore({
  reducer: {},
});