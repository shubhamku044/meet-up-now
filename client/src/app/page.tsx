'use client';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const socket = io('http://localhost:5500');

export default function Home() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);
  const [room, setRoom] = useState<Array<number>>([1, 2, 3, 4]);
  return (
    <main className="p-10">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-4 gap-4"
        >
          {room.map((item, index) => (
            <div
              className="border border-white"
              key={index}
            >
              <div
                className="flex h-28 items-center justify-center text-2xl"
              >
                {item}
              </div>
              <Link href={`/${item}`} className="w-full flex items-center justify-center py-2 text-2xl cursor-pointer bg-white text-black">
                Join room
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
