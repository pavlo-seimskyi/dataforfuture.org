import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/db";


export const loadEpisodeById = createAsyncThunk(
    "episode/loadEpisodeById",
    async ({ id }) => {
        const docRef = doc(db.firestore, "episodes", id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("No record found.")
        };
    }
);

export const episodePageSlice = createSlice({
    name: 'episode',
    initialState: {
        data: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadEpisodeById.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadEpisodeById.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadEpisodeById.rejected, (state) => {
                state.data = {};
                state.isLoading = false;
                state.hasError = true;
            })
    },
});

export const selectEpisode = (state) => state.episode;

export default episodePageSlice.reducer;
