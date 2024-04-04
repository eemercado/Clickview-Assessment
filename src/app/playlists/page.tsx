'use client';

import React, { useEffect, useState } from 'react';
import { PlaylistItem } from '../../components/playlist-item';
import { Playlist } from '../../interfaces/playlist'; 
import Link from 'next/link';

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
      <h1>Playlists</h1>
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlists/${playlist.id}`} passHref>
          <div>
            <PlaylistItem playlist={playlist}/>
          </div>
        </Link>
      ))}
    </>
  );
}

