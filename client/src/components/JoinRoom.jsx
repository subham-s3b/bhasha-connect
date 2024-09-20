import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../SocketContext';

// Join Room Code Component
const JoinRoom = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const navigate = useNavigate(); // Ensure you use this for navigation

    // Fetch profile data from localStorage on component load
    useEffect(() => {
        const savedProfileData = JSON.parse(localStorage.getItem("profileData"));
        if (savedProfileData) {
            setName(`${savedProfileData.firstName} ${savedProfileData.lastName}`);
        }
    }, [setName]);

    const handleCallClick = (id) => {
        if (id) {
            callUser(id); // Call the function to initiate the call
        }
    };

    return (
        <form className="flex flex-col w-[360px]" onSubmit={(e) => e.preventDefault()}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <div className="flex gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-16 h-16"
                        style={{ backgroundImage: 'url("https://via.placeholder.com/150")' }}
                    ></div>

                    <div className="flex flex-col">
                        <h1 className="text-[#F9FAFA] text-base font-medium leading-normal">{name || "Guest"}</h1>
                        <p className="text-[#D5D6DD] text-sm font-normal leading-normal">Joined Feb 2022</p>
                    </div>
                </div>

                <label className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <CopyToClipboard text={me}>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-[#607AFB] text-[#F9FAFA] rounded-xl text-sm font-semibold hover:bg-[#405D9B] transition duration-300"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h10M7 6h10M4 20h16V4H4v16z" />
                                </svg>
                                Copy Your ID
                            </button>
                        </CopyToClipboard>
                    </div>
                </label>
            </div>

            <div className="p-4 md:p-8">
                <div className="mb-4 text-lg font-medium text-white">
                    <p>Make a Call</p>
                </div>
                <input
                    placeholder="Enter Id to call"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    className="w-full mb-4 bg-[#22232A] border border-[#505362] text-[#F9FAFA] placeholder:text-[#D5D6DD] rounded-xl p-4 text-base font-normal leading-normal"
                />
                {callAccepted && !callEnded ? (
                    <button
                        onClick={leaveCall}
                        className="w-full bg-[#FF4D4F] text-white hover:bg-[#e03d3d] rounded-xl py-2 text-sm font-bold transition-colors"
                    >
                        Hang Up
                    </button>
                ) : (
                    <button
                        onClick={() => handleCallClick(idToCall)}
                        className="w-full bg-[#607AFB] text-white hover:bg-[#4068d4] rounded-xl py-2 text-sm font-bold transition-colors"
                    >
                        Call
                    </button>
                )}
            </div>
        </form>
    );
};

export default JoinRoom;
