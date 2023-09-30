'use client';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from 'next/navigation';

const socket = io('http://localhost:5500');

const VideoPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [users, setUsers] = useState<Array<string>>([]);
  useEffect(() => {
    socket.emit('join', name);
  }, [name]);

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
