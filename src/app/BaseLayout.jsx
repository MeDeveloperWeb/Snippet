'use client';
import { useState } from 'react';
import NavBar from './NavBar';
import { AuthContext } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useTheme } from 'next-themes';

export default function BaseLayout({ children, userData = {} }) {
  const [user, setUser] = useState({
    username: userData.username,
    access: undefined,
    id: userData.sub
  });
  const { theme } = useTheme();

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="box-border min-h-screen font-display antialiased">
        <NavBar />
        {children}
      </div>
      <ToastContainer
        theme={theme}
        position="bottom-left"
        limit={3}
        closeOnClick={true}
        autoClose={2000}
        draggable={true}
        closeButton={true}
        draggablePercent={50}
      />
    </AuthContext.Provider>
  );
}
