import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const spaceImagesStorageKey = 'spaceImages.images';

const readStoredImages = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const storedImages = window.sessionStorage.getItem(spaceImagesStorageKey);
        return storedImages ? JSON.parse(storedImages) : [];
    } catch {
        return [];
    }
};

const writeStoredImages = (images) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.sessionStorage.setItem(spaceImagesStorageKey, JSON.stringify(images));
};

export const fetchSpaceImages = createAsyncThunk(
    'spaceImages/fetchSpaceImages',
    async () => {
        const response = await fetch('https://api.nasa.gov/planetary/apod?count=15&api_key=XNTHl9bRHBBd1aCfpieNzljl4Ent2sgErRn2bNur');
        if (!response.ok) throw new Error('Failed to fetch from NASA API');
        const data = await response.json();
        const images = Array.isArray(data) ? data : [data];
        return images.map((image) => image.url).filter(Boolean);
    },
    {
        condition: (_, { getState }) => {
            const { spaceImages } = getState();
            if (spaceImages.loading || spaceImages.images.length > 0) {
                return false;
            }
        }
    }
);

const spaceImagesSlice = createSlice({
    name: 'spaceImages',
    initialState: { images: readStoredImages(), loading: false, error: null},
    reducers: {
        removeImageByUrl: (state, action) => {
            state.images = state.images.filter((img) => img !== action.payload);
            writeStoredImages(state.images);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpaceImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpaceImages.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.images = action.payload;
                writeStoredImages(state.images);
            })
            .addCase(fetchSpaceImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default spaceImagesSlice.reducer;