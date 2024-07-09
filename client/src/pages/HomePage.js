// HomePage.js: this file sets the home page of the website using react. Along with defining the layout, it deals with animations and playing the stock videos.

import React, { useEffect, useRef, useState } from 'react';
import '../css/global.css';
import '../css/pages-css/HomePage.css';

// This is the array of stock videos used behind the welcome overlay. (NOTE: The videos are kept in the public directory.)
const videos = [
  '/videos/home_page_video_phone_1.mp4',
  '/videos/home_page_video_phone_2.mp4',
  '/videos/home_page_video_laptop_1.mp4',
  '/videos/home_page_video_laptop_2.mp4'
];

// Main function of this file.
function HomePage() {

    // Next few lines shuffle the videos array to play videos in different order at each website visit.
    let currentIndex = videos.length;

    while(currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [videos[currentIndex], videos[randomIndex]] = [videos[randomIndex], videos[currentIndex]];
    }

    // Reference to the video element in the DOM.
    const videoRef = useRef(null);
    const [currentVideo, setCurrentVideo] = useState(0);

    // This is used to handle video end event and switch to the next video.
    useEffect(() => {
        const videoElement = videoRef.current;

        const handleEnded = () => {
            console.log('Video ended, currentVideo:', currentVideo);
            setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
        };
        

        videoElement.addEventListener('ended', handleEnded);

        return () => {
            videoElement.removeEventListener('ended', handleEnded);
        }
    }, [currentVideo]);

    // This is used to update the video source and play the new video when currentVideo changes.
    useEffect(() => {
        const videoElement = videoRef.current;
        videoElement.src = videos[currentVideo];
        videoElement.play().catch((error) => {
            console.error('Error playing the video: ', error);
        });
    }, [currentVideo]);

    // Render the home page with the video and overlay.
    return (
        <div className="homepage">
        <div className={`video_container fade-animation`} key={currentVideo}>
            <video ref={videoRef} autoPlay muted>
            <source src={videos[0]} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
        <div className="overlay">
            <h1>Welcome!</h1>
            <p>Sign in <a href="http://localhost:3000">here</a>!</p>
        </div>
        </div>
    );
}

export default HomePage;
