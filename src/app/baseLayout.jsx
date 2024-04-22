'use client';
import { useState } from 'react';
import NavBar from './NavBar';
import { AuthContext } from './AuthContext';

export default function BaseLayout({ children }) {
  const [user, setUser] = useState({
    username: undefined,
    access: undefined
  });

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="box-border min-h-screen font-display antialiased">
        <NavBar />
        {children}
      </div>
    </AuthContext.Provider>
  );
}
