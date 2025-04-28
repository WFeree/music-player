import React, { useEffect, useState, useRef } from 'react';

interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio_url: string;
  image: string;
}

interface MusicPlayerProps {
  clientId: "2d879d45";
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ clientId }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&include=musicinfo&order=popularity_total`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        
        const data = await response.json();

        const formattedTracks: Track[] = data.results.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist_name: track.artist_name,
          album_name: track.album_name,
          duration: track.duration,
          audio_url: track.audio,
          image: track.image
        }));
        
        setTracks(formattedTracks);
        
        // Set the first track as current if none is selected
        if (!currentTrack && formattedTracks.length > 0) {
          setCurrentTrack(formattedTracks[0]);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, [clientId]);

  // Search for tracks
  const searchTracks = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=${searchTerm}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search tracks');
      }
      
      const data = await response.json();
      
      const formattedTracks: Track[] = data.results.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist_name: track.artist_name,
        album_name: track.album_name,
        duration: track.duration,
        audio_url: track.audio,
        image: track.image
      }));
      
      setTracks(formattedTracks);
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update audio element when current track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audio_url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // Format time (seconds to MM:SS)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle track selection
  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Handle track ending
  const handleTrackEnd = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    if (currentIndex < tracks.length - 1) {
      setCurrentTrack(tracks[currentIndex + 1]);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-player">
      <h1>React Music Player</h1>
      
      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for tracks..."
        />
        <button onClick={searchTracks}>Search</button>
      </div>
      
      {/* Player */}
      <div className="player-container">
        {currentTrack && (
          <div className="now-playing">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.name} 
              className="album-cover"
            />
            <div className="track-info">
              <h2>{currentTrack.name}</h2>
              <h3>{currentTrack.artist_name}</h3>
              <p>{currentTrack.album_name}</p>
            </div>
            
            <div className="controls">
              <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <div className="progress-bar">
                <div 
                  className="progress"
                  style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                ></div>
              </div>
              
              <div className="time">
                {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
              </div>
            </div>
          </div>
        )}
        
        {/* Audio element */}
        <audio
          ref={audioRef}
          onEnded={handleTrackEnd}
        />
      </div>
      
      {/* Playlist */}
      <div className="playlist">
        <h2>Playlist</h2>
        <ul>
          {tracks.map(track => (
            <li 
              key={track.id}
              className={currentTrack?.id === track.id ? 'active' : ''}
              onClick={() => selectTrack(track)}
            >
              <img src={track.image} alt={track.name} className="track-thumbnail" />
              <div className="track-details">
                <span className="track-name">{track.name}</span>
                <span className="artist-name">{track.artist_name}</span>
                <span className="duration">{formatTime(track.duration)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;