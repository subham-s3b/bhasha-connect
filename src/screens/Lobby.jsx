import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const profiles = [
  { id: 1, name: 'John Doe', image: 'https://cdn.usegalileo.ai/stability/908b5b3a-c6a1-4e2b-bdfe-bddf6ea10852.png' },
  { id: 2, name: 'Jane Smith', image: 'https://cdn.usegalileo.ai/stability/095d9fb9-48cc-431a-85fc-9e8d1602193d.png' },
  { id: 3, name: 'Alice Johnson', image: 'https://cdn.usegalileo.ai/stability/73bdd87a-75ea-447b-8b40-d2d29bf3e855.png' },
  // Add more profiles as needed
];

const VideoPlayer = () => {
  const { roomId } = useParams();
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const toggleAudio = () => setAudioOn(prev => !prev);
  const toggleVideo = () => setVideoOn(prev => !prev);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#1C1D22] text-[#F9FAFA]">
      <div className="flex flex-1 justify-center items-center bg-[#607AFB]">
      </div>
      <div className="flex flex-col items-center p-4">
        <h2 className="text-lg font-bold mb-4">Room ID: {roomId}</h2>
        <div className="w-full max-w-md flex flex-col gap-4">
          {profiles.map(profile => (
            <div key={profile.id} className="relative group flex items-center gap-4 p-4 bg-[#3C3F4A] rounded-xl">
              <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-base font-medium">{profile.name}</p>
                <p className="text-sm text-gray-400">Listen and raise your hand to join the conversation</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-[#607AFB] text-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
