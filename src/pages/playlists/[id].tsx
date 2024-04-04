'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Playlist } from '../../interfaces/playlist'; 
import { Video } from '../../interfaces/video'; 
import PlaylistsLayout from '../../app/playlistsLayout';
import VideoItem from "../../components/video-item";

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
    <PlaylistsLayout>
      <div>
        <h1>Playlist: {playlist.name}</h1>
        {videos.map(video => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </PlaylistsLayout>
  );
}

