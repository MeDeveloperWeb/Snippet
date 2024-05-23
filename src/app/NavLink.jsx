'use client';

import {
  LoginSvg,
  MoonSvg,
  SunSvg,
  ThemeLoader,
  UserSvg
} from '@/assets/icons';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthContext } from './AuthContext';
import Link from 'next/link';
import { logUserOut } from './actions';
import { toast } from 'react-toastify';
import pingServer from './pingServer';

export default function NavLink() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [{ username }, setUser] = useContext(AuthContext);
  const dialogRef = useRef(null);

  useEffect(() => {
    // Ping the server as soon as nav loads
    pingServer();
    setMounted(true);
  }, []);

  function toggleTheme() {
    const currTheme = theme === 'system' ? systemTheme : theme;

    if (currTheme === 'dark') setTheme('light');
    else setTheme('dark');
  }

  function toggleModal() {
    if (!dialogRef?.current) return;

    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.show();
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
            ) : theme === 'dark' ||
              (theme === 'system' && systemTheme === 'dark') ? (
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
          {username ? (
            <>
              <button onClick={toggleModal} className="cursor-pointer">
                <UserSvg />
              </button>
              <dialog
                ref={dialogRef}
                className="mr-0 my-2 md:my-4 py-4"
                autoFocus
              >
                <ul
                  className="space-y-4 w-[21ch] text-center"
                  onClick={toggleModal}
                >
                  <li>
                    <Link
                      href={`/profile/${username}`}
                      className="py-2 hover:bg-[#e0e0e088] w-full inline-block"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/profile/${username}/settings`}
                      className="py-2 hover:bg-[#e0e0e088] w-full inline-block"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="py-2 hover:bg-[#e0e0e088] w-full inline-block"
                      onClick={() => {
                        logUserOut();
                        setUser({
                          username: undefined,
                          access: undefined,
                          id: undefined
                        });
                        toast.success('Logged Out Successfully!', {
                          position: 'top-center'
                        });
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </dialog>
            </>
          ) : (
            <Link
              href={username ? `/profile/${username}` : '/login'}
              className="flex gap-2"
            >
              <LoginSvg title="Login" />{' '}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
