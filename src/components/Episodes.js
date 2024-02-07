import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEpisodesList, loadEpisodesList, loadMoreEpisodes } from '../features/episodesListSlice';
import Episode from './Episode';
import { Link } from "react-router-dom";
import StatusLoading from "./StatusLoading";
import StatusError from "./StatusError";

const N_LIMIT_EPISODES_PER_TIME = 5;
const STATUS_COLOR = "#343434";

function Episodes() {
    const episodes = useSelector(selectEpisodesList);
    const dispatch = useDispatch();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!hasLoaded) {
            dispatch(loadEpisodesList({ nLimit: N_LIMIT_EPISODES_PER_TIME }));
        }
        setHasLoaded(true);
    }, [hasLoaded, dispatch]);

    function handleLoadMore() {
        dispatch(loadMoreEpisodes({ lastId: episodes.lastId, nLimit: N_LIMIT_EPISODES_PER_TIME }));
    }

    if (episodes.isLoadingInitial) {
        return (
            <main className="episodes">
                <StatusLoading color={STATUS_COLOR} />
            </main>
        );
    };

    if (episodes.hasErrorLoadingInitial) {
        return (
            <main className="episodes">
                <StatusError />
            </main>
        );
    };

    if (episodes.data && episodes.data.length > 0) {
        return (
            <main className="bg-light episodes">
                <h1 className="episodes-title">Browse Episodes</h1>
                <div className="episodes-list">
                    {episodes.data.map((episode) => {
                        const destination = `/episodes/${episode.id}`;
                        return (
                            <Link key={episode.id} to={destination} style={{textDecoration: "none"}}>
                                <Episode key={episode.id} {...episode}/>
                            </Link>
                        )
                    })}
                    {episodes.isLoadingMore ? <StatusLoading color={STATUS_COLOR} /> : (
                        <button onClick={handleLoadMore} className='button-link'>
                            Load {N_LIMIT_EPISODES_PER_TIME} more episodes
                        </button>
                    )}
                    {episodes.hadErrorLoadingMore && <StatusError />}
                </div>
            </main>
        )
    }
}

export default Episodes;
