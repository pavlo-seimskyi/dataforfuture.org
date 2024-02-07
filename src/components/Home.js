import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEpisodesList, loadEpisodesList } from '../features/episodesListSlice';
import Icon from "./Icon";
import { FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestEpisode from './LatestEpisode';
import imgPavlo from "../img/hosts-pavlo.webp";
import imgTammy from "../img/hosts-tammy.webp";
import StatusLoading from "./StatusLoading";
import StatusError from "./StatusError";


const N_EPISODES = 2;
const STATUS_COLOR = "#F1F1F1";


function Home() {
    const latestEpisodes = useSelector(selectEpisodesList);
    const dispatch = useDispatch();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!hasLoaded) {
            dispatch(loadEpisodesList({ nLimit: N_EPISODES }));
        }
        setHasLoaded(true);
    }, [hasLoaded, dispatch]);

    return (
        <main className="home">
            <section className="intro-background">
                <div className="intro">
                    <div>
                        <h1 className="title">DATA FOR FUTURE</h1>
                        <b>Data in the service of sustainability.</b>
                        <p>We are data & sustainability enthusiasts who wish to develop understandings, share insights, and 
            inspire positive actions toward an environmentally sustainable and socially just future through technology.</p>
                    </div>
                    <div className="button-links">
                        <a 
                            href="https://open.spotify.com/show/59HR57YwfrXRcqdlbyg9JE" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="button-link"
                        ><Icon icon={<FaSpotify/>}/>Spotify</a>
                        <a 
                            href="https://podcasts.apple.com/us/podcast/data-for-future/id1503064292"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button-link"
                        ><Icon icon={<FaApple/>}/>Apple Podcasts</a>
                        <a 
                            href="https://www.youtube.com/@dataforfuture5074"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="button-link"
                        ><Icon icon={<FaYoutube/>}/>YouTube</a>
                    </div>
                </div>
            </section>
            <section className="latest-episodes bg-dark">
                <h2>Latest Episodes</h2>
                {latestEpisodes.isLoadingInitial && <StatusLoading color={STATUS_COLOR} />}
                {latestEpisodes.hasErrorLoadingInitial && <StatusError />}
                {latestEpisodes.data && latestEpisodes.data.length > 0 && (
                    <div>
                        <div className="latest-episodes-list">
                            {latestEpisodes.data.map((episode) => {
                                const destination = `/episodes/${episode.id}`;
                                return (
                                    <Link key={episode.id} to={destination} style={{textDecoration: "none"}}>
                                        <LatestEpisode key={episode.id} {...episode}/>
                                    </Link>
                                )
                            })}
                        </div>
                        <Link className="load-more-button" to="/episodes">Load more</Link>
                    </div>
                )}
            </section>
            <section className="bg-light">
                <div className="about-us">
                    <h2>About Us</h2>
                    <div className="host pavlo">
                        <img src={imgPavlo} alt="Pavlo portrait"/>
                        <div className="host-description">
                            <hr/>
                            <h3>Pavlo Seimskyi</h3>
                            <h4>Software Engineer</h4>
                            <p>Passionate builder, inspired by technology used to make our world a better place. Keen on giving visibility to projects that focus on sustainability and leading meaningful conversations.</p>
                        </div>
                    </div>
                    <div className="host tammy">
                        <img src={imgTammy} alt="Tammy portrait"/>
                        <div className="host-description">
                            <hr/>
                            <h3>Tammy Liang</h3>
                            <h4>Big Data & Entrepreneur</h4>
                            <p>Life long learner and technology ethusiast. My living experience in China, US, and Europe gathers me a wide lens into the data-enabled future.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="support">
                <h2>Support the show</h2>
                <p>Enjoying our podcast? Consider making a donation, so that we can continue the flow!</p>
                <a
                    href="https://patreon.com/dataforfuture"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button-link"
                >Support</a>
            </section>
        </main>
    );
};

export default Home;
