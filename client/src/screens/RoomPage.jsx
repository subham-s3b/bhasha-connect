
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AiOutlineVideoCamera, AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { HiEmojiHappy } from 'react-icons/hi';
import { SocketContext } from '../SocketContext';

const RoomPage = () => {
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [message, setMessage] = useState('');
  const { name, callAccepted, setCallAccepted, leaveCall, setSentAudioOn, setSentVideoOn, callEnded, setCallEnded, myVideo, userVideo, stream, call } = useContext(SocketContext);
  console.log(userVideo)

  const myVideoRef = useRef(null);

  // Effect to handle page reloads and reset call states
  useEffect(() => {
    const storedCallEnded = localStorage.getItem('callEnded');
    if (storedCallEnded === 'true') {
      setCallEnded(true);
      setCallAccepted(false);
      localStorage.removeItem('callEnded'); // Clear localStorage
    }
  }, [setCallEnded, setCallAccepted]);

  useEffect(() => {
    if (stream) {
      myVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoOn(videoTrack.enabled);
        setSentVideoOn(videoTrack.enabled)

      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioOn(audioTrack.enabled);
        setSentAudioOn(audioTrack.enabled)
      }
    }
  };

  const handleHangUp = () => {
    leaveCall(); // Assuming you have a function in SocketContext to handle call end
    setCallEnded(true);
    setCallAccepted(false);
    localStorage.setItem('callEnded', 'true');
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#1C1D22] dark group/design-root overflow-x-hidden font-manrope">
      <div className="layout-container flex h-full flex-col">
        <div className="gap-1 px-6 flex flex-1 py-5">
          <div className="layout-content-container flex flex-1 h-[100vh]">
            {/* Video and Controls */}
            <div className="flex flex-col h-full w-full max-w-[1200px] flex-1 bg-[#333] rounded-lg overflow-hidden">
              <div className="relative flex flex-col items-center justify-center max-h-[100vh] overflow-hidden">
                <div className="flex flex-col md:flex-row w-full h-full">
                  {/* User Video */}
                  {callAccepted && !callEnded && (
                    <div className="flex-1 flex flex-col p-2  overflow-hidden">
                      <div className="bg-[#333] h-[90vh] rounded-lg h-full flex items-center justify-center">
                        <video
                          playsInline
                          ref={userVideo}
                          autoPlay
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  {/* My Video */}
                  <div className="flex-1 flex w-[30%] h-[30%] flex-col p-2 overflow-hidden absolute bottom-0 right-0">
                    <div className="bg-[#333] rounded-lg h-full flex items-center justify-center">
                      <video
                        playsInline
                        ref={myVideoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 space-x-4 flex">
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  >
                    <AiOutlineVideoCamera size={24} />
                  </button>
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-full ${audioOn ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  >
                    {audioOn ? <AiOutlineAudio size={24} /> : <AiOutlineAudioMuted size={24} />}
                  </button>
                  {/* Hang Up Button */}
                  <button
                    onClick={handleHangUp}
                    className="p-3 rounded-full bg-red-600 text-white"
                  >
                    Hang Up
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col w-full max-w-[400px] bg-[#2F3136] rounded-lg overflow-hidden max-h-[80vh] ml-4">
              <h3 className="text-[#F9FAFA] text-lg font-bold leading-tight tracking-[-0.015em] p-4 border-b border-[#4F545C]">Live Chat</h3>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Chat Messages */}
                <div className="flex items-end gap-3 mb-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/e5022adc-e39b-46cd-8c84-c9e058fa4b4b.png")' }}
                  ></div>
                  <div className="flex flex-1 flex-col gap-1 items-start">
                    <p className="text-[#D5D6DD] text-[13px] font-normal leading-normal max-w-[360px]">Jane</p>
                    <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#3C3F4A] text-[#F9FAFA]">Hey there! How's it going?</p>
                  </div>
                </div>
                <div className="flex items-end gap-3 mb-4 justify-end">
                  <div className="flex flex-1 flex-col gap-1 items-end">
                    <p className="text-[#D5D6DD] text-[13px] font-normal leading-normal max-w-[360px] text-right">John</p>
                    <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#607AFB] text-[#F9FAFA]">Pretty good, you?</p>
                  </div>
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/c271c9ec-680e-48fd-937c-7d50b1ebdb67.png")' }}
                  ></div>
                </div>
              </div>
              {/* Message Input */}
              <div className="flex items-center px-4 py-3 border-t border-[#4F545C]">
                <label className="flex flex-col min-w-40 h-12 flex-1">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <input
                      placeholder="Type a message"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border-none bg-[#3C3F4A] focus:border-none h-full placeholder:text-[#D5D6DD] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex border-none bg-[#3C3F4A] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
                      <button className="flex items-center justify-center p-1.5">
                        <HiEmojiHappy className="text-[#D5D6DD]" size={20} />
                      </button>
                      <button
                        className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#607AFB] text-[#F9FAFA] text-sm font-medium leading-normal flex items-center justify-center"
                        onClick={() => console.log('Send message:', message)}
                      >
                        <FiSend className="text-[#F9FAFA]" size={16} />
                        <span className="truncate ml-2">Send</span>
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
