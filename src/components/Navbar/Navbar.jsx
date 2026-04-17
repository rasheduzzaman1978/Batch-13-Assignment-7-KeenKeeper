'use client';

// Next.js এর Link component import করা হয়েছে
// এটি page reload ছাড়াই client-side navigation এর জন্য ব্যবহার হয়
import Link from 'next/link';

// Next.js এর Image component import করা হয়েছে
// optimized image loading এর জন্য ব্যবহার হয়
import Image from 'next/image';

// Next.js navigation hook
// বর্তমান URL path বের করার জন্য usePathname ব্যবহার করা হয়েছে
import { usePathname } from 'next/navigation';

// React এর useState hook import করা হয়েছে
// mobile menu open/close state manage করার জন্য
import { useState } from 'react';

// React Icons থেকে hamburger menu এবং close icon import করা হয়েছে
import { HiMenu, HiX } from 'react-icons/hi';

// React Icons থেকে navigation item icon import করা হয়েছে
import { FaHome, FaClock, FaChartBar } from 'react-icons/fa';

// Logo image import করা হয়েছে
import logoImg from '../../assets/logo.png';

// Main Navbar Component
export default function Navbar() {
  // বর্তমান page path store করা হচ্ছে
  // উদাহরণ: '/', '/timeline', '/stats'
  const pathname = usePathname();

  // Mobile menu open/close করার state
  // শুরুতে false মানে menu বন্ধ থাকবে
  const [isOpen, setIsOpen] = useState(false);

  // Navbar এর navigation items array
  // প্রতিটি item এর name, path এবং icon আছে
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

  // JSX UI return করা হচ্ছে
  return (
    // পুরো navbar wrapper
    // sticky top-0 → navbar scroll করলেও উপরে fixed থাকবে
    // z-50 → অন্য element এর উপরে থাকবে
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#f7f7f7] px-4 py-3 md:px-8">
      {/* Navbar content container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          {/* Logo image wrapper */}
          <div className="relative h-8 w-[120px] md:h-10 md:w-[150px]">
            <Image
              // Logo image source
              src={logoImg}

              // Accessibility এর জন্য alt text
              alt="KeenKeeper Logo"

              // Image width
              width={150}

              // Image height
              height={40}

              // Priority true দিলে logo image দ্রুত load হবে
              priority

              // Responsive image styling
              className="h-8 w-auto md:h-10"
            />
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        {/* 768px এর নিচে hidden থাকবে */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-3 text-sm md:text-base font-medium">
            {/* প্রতিটি nav item render করা হচ্ছে */}
            {navItems.map((item) => {
              // বর্তমান path active কিনা check করা হচ্ছে
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
                    {/* Nav item icon */}
                    {item.icon}

                    {/* Nav item name */}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        {/* শুধুমাত্র mobile screen এ visible হবে */}
        <button
          // Click করলে menu open/close toggle হবে
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center text-3xl text-[#244D3F] sm:hidden"
        >
          {/* যদি menu open থাকে তাহলে close icon দেখাবে */}
          {/* না হলে hamburger icon দেখাবে */}
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* যদি isOpen true হয় তাহলে menu show হবে */}
      {isOpen && (
        <div className="mt-4 border-t border-gray-200 pt-4 sm:hidden">
          <ul className="flex flex-col gap-2">
            {/* প্রতিটি nav item mobile menu তে render করা হচ্ছে */}
            {navItems.map((item) => {
              // বর্তমান page active কিনা check করা হচ্ছে
              const isActive =
                item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path);

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}

                    // কোনো menu item click করলে mobile menu close হয়ে যাবে
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#244D3F] text-white shadow-sm'
                        : 'text-[#5c6770] hover:bg-gray-100 hover:text-[#1f2a2e]'
                    }`}
                  >
                    {/* Nav item icon */}
                    {item.icon}

                    {/* Nav item name */}
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

