import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDocs, query, orderBy, collection, limit, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import db from "../firebase/db";

export const loadEpisodesList = createAsyncThunk(
    "episodesList/loadEpisodesList",
    async ({ nLimit }) => {
        const episodes = [];
        const episodesRef = collection(db.firestore, "episodes");
        const q = query(episodesRef, orderBy("id", "desc"), limit(nLimit));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
            episodes.push({
                ...doc.data(),
                thumbnail_url: await getDownloadURL(ref(db.storage, `img/thumbnails/${doc.id}.webp`)),
            });
        };
        return episodes;
    }
);

export const loadMoreEpisodes = createAsyncThunk(
    "episodesList/loadMoreEpisodes",
    async ({ lastId, nLimit }) => {
        const episodes = [];
        const episodesRef = collection(db.firestore, "episodes");
        const q = query(episodesRef, orderBy("id", "desc"), where("id", "<", lastId), limit(nLimit));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
            episodes.push({
                ...doc.data(),
                thumbnail_url: await getDownloadURL(ref(db.storage, `img/thumbnails/${doc.id}.webp`)),
            });
        };
        return episodes;
    }
);

export const episodesListSlice = createSlice({
    name: 'episodesList',
    initialState: {
        data: [],
        lastId: null,
        isLoadingInitial: false,
        hasErrorLoadingInitial: false,
        isLoadingMore: false,
        hasErrorLoadingMore: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadEpisodesList.fulfilled, (state, action) => {
                const episodes = action.payload;
                episodes.sort((a, b) => {return b.id - a.id});
                state.data = episodes;
                state.lastId = getLastId(episodes);
                state.isLoadingInitial = false;
                state.hasErrorLoadingInitial = false;
            })
            .addCase(loadEpisodesList.pending, (state) => {
                state.isLoadingInitial = true;
                state.hasErrorLoadingInitial = false;
            })
            .addCase(loadEpisodesList.rejected, (state) => {
                state.data = [];
                state.isLoadingInitial = false;
                state.hasErrorLoadingInitial = true;
            })
            .addCase(loadMoreEpisodes.fulfilled, (state, action) => {
                const episodes = action.payload;
                episodes.sort((a, b) => {return b.id - a.id});
                state.data = state.data.concat(episodes);
                state.lastId = getLastId(episodes);
                state.isLoadingMore = false;
                state.hasErrorLoadingMore = false;
            })
            .addCase(loadMoreEpisodes.pending, (state) => {
                state.isLoadingMore = true;
                state.hasErrorLoadingMore = false;
            })
            .addCase(loadMoreEpisodes.rejected, (state) => {
                state.isLoadingMore = false;
                state.hasErrorLoadingMore = true;
            })
        },
    });
    
    const getLastId = (episodes) => {
        if (episodes.length === 0) return null;
        return Math.min(...episodes.map(e => e.id));
    }
    
    export const selectEpisodesList = (state) => state.episodesList;
    
    export default episodesListSlice.reducer;
    