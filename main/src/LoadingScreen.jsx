import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${isLoaded ? 'loaded' : ''}`}>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
