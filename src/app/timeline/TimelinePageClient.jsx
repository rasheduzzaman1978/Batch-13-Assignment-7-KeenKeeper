'use client';

// React থেকে useEffect এবং useState hook import করা হয়েছে
import { useEffect, useState } from 'react';

import TimelineFilterDropdown from '@/components/timeline/TimelineFilterDropdown';
import TimelineSortDropdown from '@/components/timeline/TimelineSortDropdown';
import TimelineSearchInput from '@/components/timeline/TimelineSearchInput';
import TimelineCard from '@/components/timeline/TimelineCard';
import TimelineEmptyState from '@/components/timeline/TimelineEmptyState';

export default function TimelinePageClient() {
  const [entries, setEntries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Sort: Newest - Oldest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    setEntries(savedEntries);
  }, []);

  const filteredEntries = entries
    .filter((entry) => {
      const matchesFilter =
        selectedFilter === 'All' || entry.type === selectedFilter;

      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'Sort: Newest - Oldest') {
        return b.id - a.id;
      }

      return a.id - b.id;
    });

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold text-[#1F2937] sm:text-3xl lg:text-5xl">
          Timeline
        </h1>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <TimelineFilterDropdown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />

          <TimelineSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <TimelineSortDropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            isSortDropdownOpen={isSortDropdownOpen}
            setIsSortDropdownOpen={setIsSortDropdownOpen}
          />
        </div>

        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))
          ) : (
            <TimelineEmptyState />
          )}
        </div>
      </div>
    </main>
  );
}