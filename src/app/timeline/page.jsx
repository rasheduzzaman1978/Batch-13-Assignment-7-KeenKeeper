'use client';

// React থেকে useEffect এবং useState hook import করা হয়েছে
// useState → state manage করার জন্য
// useEffect → component render হওয়ার পরে side effect চালানোর জন্য
import { useEffect, useState } from 'react';

// Timeline page এর জন্য প্রয়োজনীয় custom component import করা হয়েছে
// TimelineFilterDropdown → entry filter করার dropdown
// TimelineSortDropdown → timeline sort করার dropdown
// TimelineSearchInput → timeline search input field
// TimelineCard → প্রতিটি timeline entry card আকারে দেখানোর component
// TimelineEmptyState → কোনো data না থাকলে empty message দেখানোর component
import TimelineFilterDropdown from '@/components/timeline/TimelineFilterDropdown';
import TimelineSortDropdown from '@/components/timeline/TimelineSortDropdown';
import TimelineSearchInput from '@/components/timeline/TimelineSearchInput';
import TimelineCard from '@/components/timeline/TimelineCard';
import TimelineEmptyState from '@/components/timeline/TimelineEmptyState';

// Main Timeline Page Component
export default function TimelinePage() {
  // timeline entries store করার জন্য state
  const [entries, setEntries] = useState([]);

  // বর্তমানে কোন filter select করা আছে সেটার state
  // default value 'All' মানে সব entry দেখাবে
  const [selectedFilter, setSelectedFilter] = useState('All');

  // filter dropdown open/close state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // search input এর value store করার state
  const [searchTerm, setSearchTerm] = useState('');

  // sorting option store করার state
  // default value newest থেকে oldest
  const [sortOrder, setSortOrder] = useState('Sort: Newest - Oldest');

  // sort dropdown open/close state
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Component প্রথমবার render হওয়ার পরে localStorage থেকে data load করা হবে
  useEffect(() => {
    // localStorage থেকে timelineEntries আনা হচ্ছে
    // যদি data না থাকে তাহলে default হিসেবে empty array [] নেওয়া হচ্ছে
    const savedEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    // entries state update করা হচ্ছে
    setEntries(savedEntries);
  }, []);

  // entries array filter এবং sort করা হচ্ছে
  const filteredEntries = entries
    .filter((entry) => {
      // Filter check করা হচ্ছে
      // যদি selectedFilter = 'All' হয় তাহলে সব entry থাকবে
      // না হলে entry.type selectedFilter এর সাথে match করতে হবে
      const matchesFilter =
        selectedFilter === 'All' || entry.type === selectedFilter;

      // Search check করা হচ্ছে
      // title অথবা type এর মধ্যে searchTerm থাকলে entry show হবে
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchTerm.toLowerCase());

      // filter এবং search দুইটাতেই match করলে true return করবে
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      // যদি sortOrder newest to oldest হয়
      // তাহলে বড় id আগে আসবে
      if (sortOrder === 'Sort: Newest - Oldest') {
        return b.id - a.id;
      }

      // অন্যথায় oldest to newest হবে
      return a.id - b.id;
    });

  // JSX UI return করা হচ্ছে
  return (
    // পুরো page wrapper
    // মিনিমাম height full screen
    // background color, padding responsive ভাবে সেট করা হয়েছে
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      {/* Content container center aligned */}
      <div className="mx-auto max-w-6xl">
        {/* Page title */}
        <h1 className="mb-6 text-2xl font-bold text-[#1F2937] sm:text-3xl lg:text-5xl">
          Timeline
        </h1>

        {/* Filter, Search, Sort controls section */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filter dropdown component */}
          <TimelineFilterDropdown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />

          {/* Search input component */}
          <TimelineSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Sort dropdown component */}
          <TimelineSortDropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            isSortDropdownOpen={isSortDropdownOpen}
            setIsSortDropdownOpen={setIsSortDropdownOpen}
          />
        </div>

        {/* Timeline entries list section */}
        <div className="space-y-4">
          {/* যদি filteredEntries এর মধ্যে data থাকে */}
          {filteredEntries.length > 0 ? (
            // প্রতিটি entry এর জন্য TimelineCard render হবে
            filteredEntries.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))
          ) : (
            // কোনো entry না থাকলে empty state component show হবে
            <TimelineEmptyState />
          )}
        </div>
      </div>
    </main>
  );
}

