import * as React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ videoUrl, thumbnail }: { videoUrl: any, thumbnail: any }) {
    return (
        <div className="video-player-container">
            <ReactPlayer
                light={thumbnail}
                url={videoUrl}
                controls // Enable video player controls (play, pause, volume, etc.)
                width="100%"
                height="auto"
            />
        </div>
    );
}