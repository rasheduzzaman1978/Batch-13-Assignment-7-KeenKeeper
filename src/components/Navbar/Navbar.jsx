'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../../assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12 11.204 3.046a1.125 1.125 0 0 1 1.592 0L21.75 12M4.5 9.75V19.5A1.5 1.5 0 0 0 6 21h3.75v-4.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21H18a1.5 1.5 0 0 0 1.5-1.5V9.75"
          />
        </svg>
      ),
    },
    {
      name: 'Timeline',
      path: '/timeline',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.5h3v7H3v-7Zm7.5-6h3v13h-3v-13Zm7.5 3h3v10h-3v-10Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-[#f7f7f7] px-8 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logoImg}
            alt="KeenKeeper Logo"
            width={140}
            height={40}
            className="h-auto w-auto object-contain"
            priority
          />
        </Link>

        <nav>
          <ul className="flex items-center gap-3 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#244D3F] text-white shadow-sm'
                        : 'text-[#5c6770] hover:bg-gray-100 hover:text-[#1f2a2e]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}