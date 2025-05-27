import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaVolumeUp, FaVolumeMute, FaMusic, FaPlay, FaPause } from 'react-icons/fa';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default volume at 30%
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play the audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Error playing audio:", error);
              alert("Please click OK and try the play button again. Your browser requires a user interaction before playing audio.");
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="background-music-container">
      {/* Embedded audio element */}
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        preload="auto"
      />
      
      <Button 
        variant="light" 
        size="sm" 
        className="music-toggle-btn"
        onClick={() => setShowControls(!showControls)}
        title="Background Music"
      >
        <FaMusic color={isPlaying ? "#2575fc" : "white"} />
      </Button>
      
      {showControls && (
        <div className="music-controls">
          <Button 
            variant={isPlaying ? "success" : "outline-success"} 
            size="sm" 
            onClick={togglePlay}
            className="mx-2"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Button>
          
          <Button 
            variant="light" 
            size="sm" 
            onClick={toggleMute}
            className="mx-2"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </Button>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
