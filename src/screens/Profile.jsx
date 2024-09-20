import React from 'react';
import ProfileUpdate from '../components/ProfileUpdate';
import JoinRoom from '../components/JoinRoom';

// Main Profile Page
const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#3C3F4A]">
      <header className="w-full h-16 bg-[#3C3F4A] px-10 py-3 flex justify-between">
        <div className="flex items-center gap-4 text-[#F9FAFA]">
          <h2 className="text-[#F9FAFA] text-lg font-bold">Bhasha-connect</h2>
        </div>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3C3F4A] text-[#F9FAFA] text-sm font-bold">
          <span>Leave quietly</span>
        </button>
      </header>
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        <ProfileUpdate />
        <JoinRoom />
      </div>
    </div>
  );
};

export default Profile;
