import Link from 'next/link';
import NavLink from './NavLink';

export default function NavBar() {
  return (
    <header className="sticky top-0 flex justify-between gap-4 px-8 py-2 md:py-4 shadow-lg backdrop-blur-sm bg-inherit z-[1000]">
      <Link href="/" className="font-logo text-xl md:test-2xl lg:text-3xl">
        Snippett
      </Link>
      <NavLink />
    </header>
  );
}
