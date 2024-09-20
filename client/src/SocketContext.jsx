import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer/simplepeer.min.js';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SocketContext = createContext();
const backendUrl =  import.meta.env.VITE_BACKEND_URL;
const socket = io(backendUrl);

const ContextProvider = ({ children }) => {

  console.log('Backend URL:', backendUrl);

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(true);
  const [name, setName] = useState('');
  const [callRejected, setCallRejected] = useState(false);
  const [sentVideoOn, setSentVideoOn] = useState(false);
  const [sentAudioOn, setSentAudioOn] = useState(true);

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    // Set up socket event listeners
    socket.on('me', (id) => setMe(id));
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      toast.info(`Incoming call from ${callerName}`);
    navigate('/room');

    });

    socket.on('callNotification', ({ from, name }) => {
      toast.info(`Call from ${name}`);
    });

    // Check if callEnded is stored in local storage
    const storedCallEnded = localStorage.getItem('callEnded');
    if (storedCallEnded === 'true') {
      setCallEnded(true);
      localStorage.removeItem('callEnded'); // Clear local storage
    }

    // Cleanup on unmount
    return () => {
      socket.off('callUser');
      socket.off('callNotification');
    };

  }, [callEnded, sentAudioOn, sentVideoOn]);

  const answerCall = () => {
    setCallAccepted(true);
    setCallEnded(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;

    // Redirect to /room after answering the call
    navigate('/room');
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setCallEnded(false)
      peer.signal(signal);

      // Redirect to /room after call is accepted
      navigate('/room');
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    // Store callEnded in local storage
    localStorage.setItem('callEnded', 'true');

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    navigate('/');


    window.location.reload();
  };

  const declineCall = () => {
    setCallRejected(true);
    navigate('/');

  };


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      setCallAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      setCallEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      connectionRef,
      declineCall,
      callRejected,
      setSentAudioOn,
      setSentVideoOn,
      sentAudioOn,
      sentVideoOn
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
