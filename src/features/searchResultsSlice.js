import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchResults = createAsyncThunk(
    'searchResults/fetch',
    async (searchTerm, { rejectWithValue }) => {
        if (!searchTerm || !searchTerm.trim()) {
            return rejectWithValue('Search term cannot be empty');
        }
        try {
            const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}&type=link&limit=10`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Webapp:GlobalSearchProject:v1.0.0 (by /u/OMG_gits_JSON_Bourne)'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
        errorMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.failedToLoad = false;
                state.errorMessage = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.failedToLoad = true;
                state.errorMessage = action.payload;
                console.error('Failed to fetch search results:', action.payload);
            })
        }
});

export const selectSearchResults = (state) => state.searchResults.results;
export const selectIsLoading = (state) => state.searchResults.isLoading;
export const selectFailedToLoad = (state) => state.searchResults.failedToLoad;
export const selectErrorMessage = (state) => state.searchResults.errorMessage;

export default searchResultsSlice.reducer;