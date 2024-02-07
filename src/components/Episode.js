import React from 'react';
import Icon from './Icon';
import { BiTime } from "react-icons/bi";
import { formatDate } from './utils';


function Episode({
    title,
    date,
    audio_length,
    excerpt,
    thumbnail_url,
}) {
    return (
        <div className="episode">
            <div 
                style={{ backgroundImage: `url(${thumbnail_url})` }}
                className="thumbnail"
            />
            <div className="description">
                <h2>{title}</h2>
                <hr/>
                <div className="date-length">
                    <p className="date">{formatDate(date)}</p>
                    <div className="length"><Icon icon={<BiTime/>}/>{audio_length}</div>
                </div>
                <p>{excerpt}</p>
            </div>
        </div>
    )
}

export default Episode;
