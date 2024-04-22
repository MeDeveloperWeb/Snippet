'use client';

import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function DefaultProfile() {
  const [user, setUser] = useContext(AuthContext);

  if (user.access) redirect(`/profile/${user.username}`);
  else redirect('/login?q=profile');
}
