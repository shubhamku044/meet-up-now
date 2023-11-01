'use client';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { usePathname, useSearchParams } from 'next/navigation';

const socket = io('http://localhost:5500');

const VideoPage = ({ params }: { params: { id: string } }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<Array<{ userName: string, roomCode: string }>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomCode = usePathname().split('/').pop();
  const searchParams = useSearchParams();

  useEffect(() => {
    setUserName(searchParams.get('name') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!userName) return;
    socket.emit('join-room', { roomCode, userName });
  }, [userName, roomCode]);

  useEffect(() => {
    socket.on('user-connect', (payload) => {
      console.log('new user joined', payload);
      setUsers((prv) => [...prv, payload]);
    });
  });

  const getVideo = () => {
    if (!window.navigator) return;
    window
      .navigator
      .mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        (video as HTMLVideoElement).srcObject = stream;
        (video as HTMLVideoElement).play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const stopVideo = () => {
    let video = videoRef.current;
    const srcObject: MediaStream | null = video?.srcObject as MediaStream | null;
    if (srcObject) {
      srcObject.getTracks().map((track: MediaStreamTrack) => {
        track.stop();
      });
    }
  };

  useEffect(() => {
    if (showVideo) {
      getVideo();
    } else {
      stopVideo();
    }
  }, [showVideo]);

  return (
    <main className="p-10">
      <div className="max-w-5xl mx-auto">
        <div className='grid grid-cols-2 gap-10'>
          {users.map(({ userName, roomCode }) => {
            return (
              <div key={userName}>
                <video
                  className='w-full aspect-square border-4 border-dashed bg-red-900 text-9xl'
                  ref={videoRef}
                >
                </video>
                <div className='flex justify-between'>
                  <div>
                    <button onClick={() => setShowVideo(!showVideo)}>
                      {showVideo ? 'Stop' : 'Start'}
                    </button>
                  </div>
                  <p>{userName}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className='mt-40 bg-blue-600 text-4xl text-white'
          onClick={() => {
            console.log(users);
          }}
        >
          get users
        </button>
      </div>
    </main >
  );
};

export default VideoPage;
