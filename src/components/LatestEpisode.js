import React from "react";
import Icon from "./Icon";
import { BiTime } from "react-icons/bi";
import { formatDate } from "./utils";


function LatestEpisode({
    title,
    date,
    audio_length,
    thumbnail_url,
}) {
    return (
        <div
            style={{
                background: `linear-gradient( rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.7) ), url('${thumbnail_url}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "5px",
            }}>
            <div className="latest-episode">
                <hr/>
                <span className="length"><Icon icon={<BiTime/>}/>{audio_length}</span>
                <h3>{title}</h3>
                <p className="date">{formatDate(date)}</p>
            </div>
        </div>
    )
}

export default LatestEpisode;