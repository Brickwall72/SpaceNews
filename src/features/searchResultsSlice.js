import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchResults = createAsyncThunk(
    'searchResults/fetch',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}&limit=10`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.data.children.map(child => child.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        results: [],
        isLoading: false,
        failedToLoad: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.failedToLoad = false;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                console.error('Failed to fetch search results:', action.error);
                state.isLoading = false;
                state.failedToLoad = true;
            })
        }
});

export const selectSearchResults = (state) => state.searchResults.results;
export const selectIsLoading = (state) => state.searchResults.isLoading;
export const selectFailedToLoad = (state) => state.searchResults.failedToLoad;

export default searchResultsSlice.reducer;