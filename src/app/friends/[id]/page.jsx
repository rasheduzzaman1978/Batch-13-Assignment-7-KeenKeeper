'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  FaPhoneAlt,
  FaCommentDots,
  FaVideo,
  FaClock,
  FaArchive,
  FaTrash,
  FaPen,
} from 'react-icons/fa';
import friends from '@/data/friends.json';

export default function FriendDetailsPage({ params }) {
    const resolvedParam = use(params);

  const friend = friends.find(
    (item) => item.id === parseInt(resolvedParam.id)
  );

  const [timelineEntries, setTimelineEntries] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  if (!friend) {
    notFound();
  }

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

  const handleCheckIn = (type) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      title: `${type} with ${friend.name}`,
    };

    setTimelineEntries((prev) => [newEntry, ...prev]);
    setToastMessage(`${type} entry added successfully!`);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={friend.picture}
                  alt={friend.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-[#1F2937]">
                {friend.name}
              </h2>

              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                  friend.status
                )}`}
              >
                {friend.status}
              </span>

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

              <p className="mt-5 text-sm italic text-gray-500">
                "{friend.bio}"
              </p>

              <p className="mt-3 text-sm text-gray-400">
                {friend.email}
              </p>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition hover:bg-gray-50">
            <FaClock />
            Snooze 2 Weeks
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition hover:bg-gray-50">
            <FaArchive />
            Archive
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-500 shadow-sm transition hover:bg-red-100">
            <FaTrash />
            Delete
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:col-span-2">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-[#244D3F]">
                {friend.days_since_contact}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Days Since Contact
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-[#244D3F]">
                {friend.goal}
              </h3>
              <p className="mt-2 text-sm text-gray-500">Goal (Days)</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <h3 className="text-lg font-bold text-[#244D3F]">
                {friend.next_due_date}
              </h3>
              <p className="mt-2 text-sm text-gray-500">Next Due Date</p>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937]">
                  Relationship Goal
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Connect every{' '}
                  <span className="font-semibold text-[#244D3F]">
                    {friend.goal} days
                  </span>
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-[#1F2937] transition hover:bg-gray-50">
                <FaPen className="text-xs" />
                Edit
              </button>
            </div>
          </div>

          {/* Quick Check-In */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1F2937]">
              Quick Check-In
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                onClick={() => handleCheckIn('Call')}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-5 text-sm font-medium text-[#1F2937] transition hover:bg-gray-50"
              >
                <FaPhoneAlt />
                Call
              </button>

              <button
                onClick={() => handleCheckIn('Text')}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-5 text-sm font-medium text-[#1F2937] transition hover:bg-gray-50"
              >
                <FaCommentDots />
                Text
              </button>

              <button
                onClick={() => handleCheckIn('Video')}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-5 text-sm font-medium text-[#1F2937] transition hover:bg-gray-50"
              >
                <FaVideo />
                Video
              </button>
            </div>
          </div>

          {/* Timeline Entries */}
          {timelineEntries.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1F2937]">
                Timeline Entries
              </h3>

              <div className="mt-4 space-y-3">
                {timelineEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <p className="font-medium text-[#1F2937]">
                      {entry.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {entry.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 rounded-lg bg-[#244D3F] px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </main>
  );
}