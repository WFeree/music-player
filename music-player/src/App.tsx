import { useState } from 'react';
import App from './App'
import MusicPlayer from './pages/musicPlayer';

function App() {
  return (
    <div className="App">
      <MusicPlayer clientId="2d879d45" />
    </div>
  );
}