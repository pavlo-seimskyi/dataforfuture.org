import { configureStore } from '@reduxjs/toolkit';
import episodesListReducer from '../features/episodesListSlice';
import episodePageReducer from '../features/episodePageSlice';

const store = configureStore({
    reducer: {
        episodesList: episodesListReducer,
        episode: episodePageReducer,
    },
});

export default store;
