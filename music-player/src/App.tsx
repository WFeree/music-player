
import './App.css'
import { useState } from 'react';
import MusicPlayer from './pages/musicPlayer';
import Navbar from './components/navbar';
import PlayerPage from './pages/playerPage';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="App">
      <MusicPlayer clientId="2d879d45" />
      <PlayerPage/>
    </div>
    </>
  );
}

export default App
