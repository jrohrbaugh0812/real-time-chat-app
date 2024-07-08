import React, { useEffect, useRef, useState } from 'react';
import '../css/global.css';
import '../css/pages-css/HomePage.css';

const videos = [
  '/videos/home_page_video_phone_1.mp4',
  '/videos/home_page_video_phone_2.mp4',
  '/videos/home_page_video_laptop_1.mp4',
  '/videos/home_page_video_laptop_2.mp4'
];

function HomePage() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

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

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.src = videos[currentVideo];
    videoElement.play().catch((error) => {
        console.error('Error playing the video: ', error);
    });
  }, [currentVideo]);

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
