import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './App.css';
import Profile from './screens/Profile';
import RoomPage from './screens/RoomPage';
import Notifications from './components/Notification'; // Ensure this import is correct
import { ContextProvider } from './SocketContext'; // Ensure this import is correct

function App() {
  return (
    <ContextProvider>
      <div className="App">
        {/* <ToastContainer /> */}
        <Notifications /> {/* Include Notifications component */}
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
