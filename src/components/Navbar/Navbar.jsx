'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHome, FaClock, FaChartBar } from 'react-icons/fa';
import logoImg from '../../assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <FaHome className="h-4 w-4" />,
    },
    {
      name: 'Timeline',
      path: '/timeline',
      icon: <FaClock className="h-4 w-4" />,
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: <FaChartBar className="h-4 w-4" />,
    },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-[#f7f7f7] px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logoImg}
            alt="KeenKeeper Logo"
            width={150}
            height={40}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden min-[900px]:block">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center text-3xl text-[#244D3F] min-[900px]:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mt-4 border-t border-gray-200 pt-4 min-[900px]:hidden">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ${
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
        </div>
      )}
    </header>
  );
}