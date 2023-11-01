'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [roomCode, showRoomCode] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <main className="p-10">
      <div className="max-w-5xl mx-auto">
        <div className='flex gap-4'>
          <input
            className='border-1 px-2 py-1 rounded w-54 text-black'
            placeholder='Enter room number'
            value={roomCode}
            onChange={(e) => showRoomCode(e.target.value)}
          />
          <input
            className='border-1 px-2 py-1 rounded w-54 text-black'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className='border-1 px-4 py-2 rounded bg-blue-500 text-xl'
            onClick={() => {
              router.push(`/${roomCode}?name=${name}`);
            }}
          >
            Join
          </button>
        </div>
      </div>
    </main >
  );
}
