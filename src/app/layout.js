import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppProviders from '@/providers/AppProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Home | KeenKeeper',
  description: 'Track your friendship and interactions with KeenKeeper',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
<body className="flex min-h-screen flex-col bg-[#f5f7f8]">
  <AppProviders>
    <Navbar />

    <main className="flex-1">{children}</main>

    <ToastContainer position="top-center" autoClose={1500} />
    <Footer />
  </AppProviders>
</body>
    </html>
  );
}