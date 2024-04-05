'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Playlist } from '../../interfaces/playlist'; 
import { Video } from '../../interfaces/video'; 
import SimpleLayout from '../../app/playlistsLayout';
import VideoItem from "../../components/video-item";
import { Button } from "react-bootstrap";
import { ImExit } from "react-icons/im";

export default function PlaylistIDPage() {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('/api/playlists');
      if (!response.ok) {
        console.error('Failed to fetch playlists');
        return;
      }
      const playlists: Playlist[] = await response.json();
      const foundPlaylist = playlists.find((p) => p.id.toString() === id);
      setPlaylist(foundPlaylist || null);
      
      const videosResponse = await fetch('/api/videos');
      if (!videosResponse.ok) {
        console.error('Failed to fetch videos');
        return;
      }
      const allVideos: Video[] = await videosResponse.json();
      if (foundPlaylist) {
        const playlistVideos = allVideos.filter(video => foundPlaylist.videoIds.includes(video.id));
        setVideos(playlistVideos);
      }
    };

    if (id) {
      fetchPlaylists();
    }
  }, [id]);

  if (!playlist) return <div>If waiting too long, Error... else, Loading...</div>;

  return (
    <SimpleLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Playlist: {playlist.name}</h1>
        <Button 
          href="../../playlists"
          style={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '8px 47px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            marginTop: '-10px',
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
          }}>
          Exit <ImExit style={{ marginLeft: '10px' }}/>
        </Button>
      </div>

      {videos.map(video => (
          <VideoItem key={video.id} video={video} />
        ))}
    </SimpleLayout>
  );
}

