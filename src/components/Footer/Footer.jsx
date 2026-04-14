'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookSquare } from 'react-icons/fa';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import logoImg from '../../assets/logo-xl.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#244D3F] px-6 py-12 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Top Content */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src={logoImg}
              alt="KeenKeeper Logo"
              width={280}
              height={80}
              priority
              className="h-auto w-50 md:w-80 lg:w-100 object-contain"
            />
          </Link>

          <p className="mt-4 max-w-3xl text-sm md:text-base text-gray-200 ">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          <h3 className="mt-8 text-base md:text-xl font-medium tracking-wide text-gray-200">
            Social Links
          </h3>

          <div className="mt-4 flex items-center gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
            >
              <PiInstagramLogoFill className="text-lg" />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
            >
              <FaFacebookSquare className="text-lg" />
            </Link>

            <Link
              href="https://x.com"
              target="_blank"
              className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
            >
              <FaXTwitter className="text-lg" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10"></div>

        {/* Bottom Content */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm md:text-base text-gray-300 md:flex-row">
          <p>© {currentYear} KeenKeeper. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>

            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}