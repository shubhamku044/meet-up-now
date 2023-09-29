'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5500');

const VideoPage = ({ params }: { params: { id: string } }) => {
  const [users, setUsers] = useState<Array<string>>([]);
  const generateRandomString = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
  };
  useEffect(() => {
    socket.emit('join', generateRandomString());
  }, []);

  useEffect(() => {
    socket.on('user-joined', (data: string) => {
      setUsers((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
      <h1>This is room no: {params.id}</h1>
      <div className="grid grid-cols-2 gap-4">
        {users.map((item, index) => (
          <div
            className="border border-white"
            key={index}
          >
            <div
              className="flex h-28 items-center justify-center text-2xl"
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
