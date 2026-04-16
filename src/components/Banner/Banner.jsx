'use client';

import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import friends from '@/data/friends.json';

export default function Banner() {
  const [summaryCards, setSummaryCards] = useState([]);

  const loadSummaryCards = () => {
    // Total friends count
    const totalFriends = friends.length;

    // Friends who are on track
    const onTrackCount = friends.filter(
      (friend) => friend.status === 'on-track'
    ).length;

    // Friends who need attention
    const needAttentionCount = friends.filter(
      (friend) =>
        friend.status === 'almost due' || friend.status === 'overdue'
    ).length;

    // Get timeline entries from localStorage
    const timelineEntries =
    JSON.parse(localStorage.getItem('timelineEntries')) || [];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const interactionsThisMonth = timelineEntries.filter((entry) => {
    if (!entry.date) return false;

    const [datePart] = entry.date.split(' • ');

    if (!datePart) return false;

    const entryDate = new Date(datePart);

    return (
      !isNaN(entryDate.getTime()) &&
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear
       );
    }).length;

    // Set summary cards
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
  };

  useEffect(() => {
    // Initial load
    loadSummaryCards();

    // Re-load when localStorage changes
    const handleStorageChange = () => {
      loadSummaryCards();
    };

    const handleTimelineUpdate = () => {
      loadSummaryCards();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('timelineUpdated', handleTimelineUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('timelineUpdated', handleTimelineUpdate);
    };
  }, []);

  return (
    <section className="bg-[#f5f7f8] px-4 py-6 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="text-[28px] font-bold text-[#1F2937] sm:text-4xl md:text-[45px] lg:text-5xl">
          Friends to keep close in your life
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-[#64748B] md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <div className="mt-8">
          <button className="btn border-none bg-[#244D3F] text-white hover:bg-[#1e3f34]">
            <FaPlus className="text-xs" />
            Add a Friend
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border border-gray-200 bg-white px-6 py-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#244D3F] md:text-[32px]">
                {card.number}
              </h2>

              <p className="mt-2 text-base text-[#6b7280] md:text-[18px]">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}