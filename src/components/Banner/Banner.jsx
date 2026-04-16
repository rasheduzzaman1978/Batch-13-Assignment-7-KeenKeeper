'use client';

// Marks this component as a Client Component in Next.js.
// This is required because we are using hooks like useEffect and useState,
// and also accessing browser-only APIs such as localStorage.

import { useEffect, useState } from 'react';
// useState: stores dynamic data inside the component.
// useEffect: runs side effects after the component renders.

import { FaPlus } from 'react-icons/fa';
// Importing the plus icon from react-icons.

import friends from '@/data/friends.json';
// Importing local JSON data that contains all friend information.

export default function Banner() {
  // State to store summary card information.
  // Initially সেট করা হয়েছে empty array হিসেবে.
  const [summaryCards, setSummaryCards] = useState([]);

  useEffect(() => {
    // Total number of friends.
    // friends.json array-এর length count করা হচ্ছে.
    const totalFriends = friends.length;

    // Count how many friends are currently "on-track".
    // filter() দিয়ে শুধুমাত্র on-track status-এর friend বের করা হচ্ছে,
    // তারপর তাদের সংখ্যা count করা হচ্ছে.
    const onTrackCount = friends.filter(
      (friend) => friend.status === 'on-track'
    ).length;

    // Count how many friends need attention.
    // যাদের status "almost due" বা "overdue" তাদের count করা হচ্ছে.
    const needAttentionCount = friends.filter(
      (friend) =>
        friend.status === 'almost due' || friend.status === 'overdue'
    ).length;

    // timelineEntries localStorage থেকে আনা হচ্ছে.
    // যদি কিছু না থাকে তাহলে default হিসেবে empty array দেওয়া হচ্ছে.
    const timelineEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    // Current month and current year বের করা হচ্ছে.
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Count how many interactions happened in the current month.
    // প্রতিটি entry-এর date compare করা হচ্ছে current month এবং year-এর সাথে.
    const interactionsThisMonth = timelineEntries.filter((entry) => {
      const entryDate = new Date(entry.date);

      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    }).length;

    // সব summary data state-এ set করা হচ্ছে.
    // এই array পরে cards render করতে ব্যবহার হবে.
    setSummaryCards([
      {
        number: totalFriends,
        label: 'Total Friends',
      },
      {
        number: onTrackCount,
        label: 'On Track',
      },
      {
        number: needAttentionCount,
        label: 'Need Attention',
      },
      {
        number: interactionsThisMonth,
        label: 'Interactions This Month',
      },
    ]);
  }, []);
  // Empty dependency array [] means this effect runs only once
  // when the component mounts.

  return (
    <section className="bg-[#f5f7f8] px-4 py-6 md:py-12 md:px-8 lg:px-12">
      {/* Main section container with background color and responsive padding */}

      <div className="mx-auto max-w-6xl text-center">
        {/* Centers content and limits max width */}

        {/* Title */}
        <h1 className="text-[28px] sm:text-4xl md:text-[45px] lg:text-5xl font-bold text-[#1F2937]">
          Friends to keep close in your life
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[#64748B] md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Button Section */}
        <div className="mt-8">
          <button className="btn border-none bg-[#244D3F] text-white hover:bg-[#1e3f34]">
            {/* Plus icon shown before the text */}
            <FaPlus className="text-xs" />

            {/* Button text */}
            Add a Friend
          </button>
        </div>

        {/* Summary Cards Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Loop through each summary card */}
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border border-gray-200 bg-white px-6 py-8 shadow-sm"
            >
              {/* Card Number */}
              <h2 className="text-2xl md:text-[32px] font-semibold text-[#244D3F]">
                {card.number}
              </h2>

              {/* Card Label */}
              <p className="mt-2 text-base md:text-[18px] text-[#6b7280]">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

