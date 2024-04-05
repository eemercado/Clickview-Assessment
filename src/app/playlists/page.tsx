'use client';

import React, { useEffect, useState } from 'react';
import { PlaylistItem } from '../../components/playlist-item';
import { Playlist } from '../../interfaces/playlist'; 
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('/api/playlists');
      const data = await response.json();
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Playlists</h1>
        <Button 
          style={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '8px 28px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            marginTop: '-10px',
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: '25px'
          }}>
          New Playlist <FaPlus style={{ marginLeft: '10px' }}/>
        </Button>
      </div>
      {playlists.map((playlist) => {
        return <PlaylistItem key={playlist.id} playlist={playlist} />;
      })}

    </>
  );
}

