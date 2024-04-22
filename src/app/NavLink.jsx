'use client';

import {
  LoginSvg,
  MoonSvg,
  SunSvg,
  ThemeLoader,
  UserSvg
} from '@/assets/icons';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { getUserAuthDetails } from './Auth';
import { usePathname } from 'next/navigation';
import { AuthContext } from './AuthContext';
import Link from 'next/link';

export default function NavLink() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [{ username, access }, setUser] = useContext(AuthContext);
  useEffect(() => {
    setMounted(true);
    (async () => setUser(await getUserAuthDetails()))();
  }, [setUser]);

  function toggleTheme() {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  }
  return (
    <nav>
      <ul className="flex h-full justify-evenly gap-8">
        <li>
          <button
            aria-label="Switch theme"
            title="Switch theme"
            onClick={toggleTheme}
          >
            {!mounted ? (
              <ThemeLoader />
            ) : theme === 'dark' ? (
              <SunSvg />
            ) : (
              <MoonSvg />
            )}
          </button>
        </li>
        {usePathname().includes('snippet') || (
          <li className="flex gap-2">
            <Link href={'/snippet'}>
              <i title="Write Code" aria-label="Write Code">
                &lt;<span className="hidden md:inline">Code</span>/&gt;
              </i>
            </Link>
          </li>
        )}
        <li>
          <Link
            href={access ? `/profile/${username}` : '/login'}
            className="flex gap-2"
          >
            {access ? (
              <UserSvg />
            ) : (
              <>
                <LoginSvg title="Login" />{' '}
                <span className="hidden md:inline">Login</span>
              </>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
