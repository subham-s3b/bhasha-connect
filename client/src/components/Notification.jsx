import React, { useContext } from 'react';
import { AiOutlinePhone, AiOutlineClose } from 'react-icons/ai';
import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, declineCall, call, callAccepted, callRejected } = useContext(SocketContext);
  // console.log(call);

  if (!call.isReceivingCall || callAccepted || callRejected) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2F3136] rounded-lg p-6 w-full max-w-md shadow-lg text-center">
        <h2 className="text-white text-lg font-semibold mb-4">{call.name} is calling...</h2>
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
            onClick={answerCall}
          >
            <AiOutlinePhone className="mr-2" size={20} />
            Accept
          </button>
          <button
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
            onClick={declineCall}
          >
            <AiOutlineClose className="mr-2" size={20} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
