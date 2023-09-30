'use client';
import { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const socket = io('http://localhost:5500');

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);

  const getVideo = () => {
    if (!window.navigator) return;
    window
      .navigator
      .mediaDevices
      .getUserMedia({ video: true }).then((stream) => {
        let video = videoRef.current;
        (video as HTMLVideoElement).srcObject = stream;
        (video as HTMLVideoElement).play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  /*
    useEffect(() => {
      getVideo();
    }, []); */

  return (
    <main className="p-10">
      <div className="max-w-5xl mx-auto">
        <video
          className='w-64 aspect-square border-4 border-dashed'
          ref={videoRef}
        >
        </video>
      </div>
    </main >
  );
}
