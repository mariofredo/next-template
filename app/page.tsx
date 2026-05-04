'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import api from '@/lib/api';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const getTiktokData = async () => {
    try {
      const res = await api.get('http://localhost:3000/api/videos');
      console.log(res.data);
      setVideos(res.data.data.videos);
    } catch (error) {}
  };
  useEffect(() => {
    getTiktokData();
  }, []);
  return (
    <div className={clsx(`flex h-screen flex-col items-center justify-center gap-[20px]`)}>
      <h1 className={clsx(`text-[32px] font-bold`)}>Welcome to Next Template</h1>
      <div className={clsx(`flex flex-col items-center gap-[10px]`)}>
        {videos.map((video: any) => (
          <div key={video.id} className={clsx(`flex flex-col items-center gap-[10px]`)}>
            <Image src={video.cover_image_url} alt={video.title} width={200} height={200} />
            <h2 className={clsx(`text-[18px] font-bold`)}>{video.title}</h2>
            <Link
              href={video.share_url}
              target="_blank"
              className={clsx(`text-blue-500 underline`)}
            >
              Watch on TikTok
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
