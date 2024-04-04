'use client';

import { useEffect, useState } from 'react';
import VideoItem from '../../components/video-item'; 
import { Video } from '../../interfaces/video'; 

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <>
      <h1>Videos</h1>
      {videos.map(video => (
        <VideoItem key={video.id} video={video} />
      ))}
    </>
  );
}
