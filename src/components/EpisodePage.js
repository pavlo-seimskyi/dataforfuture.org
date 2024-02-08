import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEpisode, loadEpisodeById } from '../features/episodePageSlice';
import { useParams } from 'react-router-dom';
import { FaSpotify, FaApple } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { formatDate } from './utils';
import Icon from './Icon';
import StatusLoading from "./StatusLoading";
import StatusError from "./StatusError";

const STATUS_COLOR = "#343434";

function EpisodePage() {
    const { episodeId } = useParams();
    const episode = useSelector(selectEpisode);
    const data = episode.data;
    const dispatch = useDispatch();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!hasLoaded) {
            dispatch(loadEpisodeById({id: episodeId}));
        }
        setHasLoaded(true);
    }, [hasLoaded, episodeId, dispatch]);

    if (episode.isLoading) {
        return (
            <main className="episode-page">
                <StatusLoading color={STATUS_COLOR} />
            </main>
        );
    }

    if (episode.hasError) {
        return (
            <main className="episode-page">
                <StatusError />
            </main>
        );
    }

    if (episode.data) {
        return (
            <main className="episode-page">
                <div className="episode-page-background">
                    <div className="episode-page-meta">
                        <h2>{data.title}</h2>
                        <hr/>
                        <div className="date-length">
                            <p className="date">{formatDate(data.date)}</p>
                            <div className="length"><Icon icon={<BiTime/>}/>{data.audio_length}</div>
                        </div>
                        <p>{data.excerpt}</p>
                        <div className="button-links">
                            <a 
                                href={data.spotify_link}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="button-link"
                            ><Icon icon={<FaSpotify/>}/>Spotify</a>
                            <a 
                                href={data.itunes_link}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="button-link"
                            ><Icon icon={<FaApple/>}/>Apple Podcasts</a>
                        </div>
                    </div>
                </div>
                <div className="bg-light episode-page-content-background">
                    <div 
                        className="episode-page-content"
                        dangerouslySetInnerHTML={{ __html: data.content }} 
                    />
                </div>
            </main>
        )
    }
}

export default EpisodePage;
