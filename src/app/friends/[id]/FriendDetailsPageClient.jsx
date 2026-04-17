'use client';

// React use hook for params promise
import { use } from 'react';

// Next.js Image component
import Image from 'next/image';

// যদি friend না পাওয়া যায় তাহলে not found page দেখাবে
import { notFound } from 'next/navigation';

// প্রয়োজনীয় Font Awesome icons
import {
  FaClock,
  FaArchive,
  FaTrash,
  FaPen,
} from 'react-icons/fa';

// Toast notification এর জন্য
import { toast } from 'react-toastify';

// Friends JSON data import
import friends from '@/data/friends.json';

// Timeline context hook
import { useTimeline } from '@/context/TimelineContext';

// Custom images import
import callImg from '@/assets/call.png';
import textImg from '@/assets/text.png';
import videoImg from '@/assets/video.png';

export default function FriendDetailsPageClient({ params }) {
  // Promise params resolve করা
  const resolvedParams = use(params);

  // URL এর id অনুযায়ী friend খুঁজে বের করা
  const friend = friends.find(
    (item) => item.id === parseInt(resolvedParams.id)
  );

  const { addTimelineEntry } = useTimeline();

  // যদি friend না পাওয়া যায় তাহলে 404 page দেখাবে
  if (!friend) {
    notFound();
  }

  // Friend status অনুযায়ী আলাদা style set করা
  const getStatusStyle = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-500 text-white';

      case 'almost due':
        return 'bg-yellow-400 text-white';

      case 'on-track':
        return 'bg-green-700 text-white';

      default:
        return 'bg-gray-300 text-black';
    }
  };

  // Quick Check-In button click handle function
  const handleCheckIn = (type) => {
    const now = new Date();

    // নতুন timeline entry object
    const newEntry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend.name}`,
      date: `${now.toLocaleDateString('en-US', {
        weekday: 'long',
      })}, ${now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })} • ${now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`,
    };

    addTimelineEntry(newEntry);

    // Toast notification show করা
    toast.success(`${type} with ${friend.name} added to timeline!`);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        {/* Left Side Section */}
        <div className="space-y-4">
          {/* Friend Info Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Friend Profile Image */}
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={friend.picture}
                  alt={friend.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Friend Name */}
              <h2 className="mt-4 text-2xl font-bold text-[#1F2937]">
                {friend.name}
              </h2>

              {/* Friend Status */}
              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                  friend.status
                )}`}
              >
                {friend.status}
              </span>

              {/* Friend Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium uppercase text-[#244D3F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Friend Bio */}
              <p className="mt-5 text-sm italic text-gray-500">
                "{friend.bio}"
              </p>

              {/* Friend Email */}
              <p className="mt-3 text-sm text-gray-400">
                {friend.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg cursor-pointer border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition hover:bg-gray-50">
            <FaClock />
            Snooze 2 Weeks
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg cursor-pointer border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition hover:bg-gray-50">
            <FaArchive />
            Archive
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg cursor-pointer border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-500 shadow-sm transition hover:bg-red-100">
            <FaTrash />
            Delete
          </button>
        </div>

       {/* Right Side Section */}
<div className="space-y-4 lg:col-span-2">
   {/* Stats Cards */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="relative">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl font-bold text-green-700 shadow-inner">
        {friend.days_since_contact}
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        Days Since Contact
      </p>
    </div>
  </div>

  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="relative">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-700 shadow-inner">
        {friend.goal}
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        Goal (Days)
      </p>
    </div>
  </div>

  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="relative">
      <div className="mx-auto flex h-14 min-w-[56px] items-center justify-center rounded-2xl bg-purple-100 px-3 text-sm font-bold text-purple-700 shadow-inner">
        {friend.next_due_date}
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        Next Due Date
      </p>
    </div>
  </div>
</div>
{/* Relationship Goal Card */}
<div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
    {/* Left Content */}
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 shadow-inner">
        <FaPen className="text-lg text-green-700" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1F2937]">
          Relationship Goal
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Connect every{' '}
          <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-[#244D3F]">
            {friend.goal} days
          </span>
        </p>
      </div>
    </div>

    {/* Edit Button */}
    <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition-all duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-700 hover:shadow-md">
      <FaPen className="text-xs" />
      Edit Goal
    </button>
  </div>
</div>

         {/* Quick Check-In Section */}
<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  <h3 className="text-lg font-semibold text-[#1F2937]">
    Quick Check-In
  </h3>

  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
    {[
      {
        label: 'Call',
        image: callImg,
        gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
        iconBg: 'bg-green-100',
        hoverText: 'group-hover:text-green-600',
      },
      {
        label: 'Text',
        image: textImg,
        gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        iconBg: 'bg-blue-100',
        hoverText: 'group-hover:text-blue-600',
      },
      {
        label: 'Video',
        image: videoImg,
        gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
        iconBg: 'bg-purple-100',
        hoverText: 'group-hover:text-purple-600',
      },
    ].map((item) => (
      <button
        key={item.label}
        onClick={() => handleCheckIn(item.label)}
        className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
      >
        {/* Hover Gradient Background */}
        <div
          className={`absolute inset-0 ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
        />

        {/* Content */}
<div className="relative flex flex-col items-center justify-center gap-3">
  {/* Icon */}
  <div
    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} shadow-inner ring-1 ring-white/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}
  >
    {/* Soft Glow */}
    <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

    <Image
      src={item.image}
      alt={item.label}
      width={24}
      height={24}
      className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-110"
    />
  </div>

  {/* Label */}
  <span
    className={`text-sm font-semibold text-gray-700 transition-colors duration-300 ${item.hoverText}`}
  >
    {item.label}
  </span>
</div>
      </button>
    ))}
  </div>
</div>
        </div>
      </div>
    </main>
  );
}