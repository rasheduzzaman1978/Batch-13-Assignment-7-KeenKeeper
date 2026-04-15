'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import callImg from '../../assets/call.png';
import textImg from '../../assets/text.png';
import videoImg from '../../assets/video.png';

export default function TimelinePage() {
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

  const getIcon = (type) => {
    switch (type) {
      case 'Call':
        return (
          <Image
            src={callImg}
            alt="Call"
            width={20}
            height={20}
            className="object-contain"
          />
        );

      case 'Text':
        return (
          <Image
            src={textImg}
            alt="Text"
            width={20}
            height={20}
            className="object-contain"
          />
        );

      case 'Video':
        return (
          <Image
            src={videoImg}
            alt="Video"
            width={20}
            height={20}
            className="object-contain"
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold text-[#1F2937] sm:text-3xl lg:text-5xl">
          Timeline
        </h1>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filter Dropdown */}
          <div className="relative w-52">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm outline-none transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
            >
              <span>{selectedFilter}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25L12 15.75 4.5 8.25"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                {['All', 'Call', 'Text', 'Video'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left text-sm font-medium transition ${
                      selectedFilter === option
                        ? 'bg-[#244D3F] text-white'
                        : 'text-[#1F2937] hover:bg-[#244D3F]/10 hover:text-[#244D3F]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Search by friend name or interaction type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-56">
            <button
              onClick={() =>
                setIsSortDropdownOpen(!isSortDropdownOpen)
              }
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
            >
              <span>{sortOrder}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-4 w-4 transition-transform duration-200 ${
                  isSortDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25L12 15.75 4.5 8.25"
                />
              </svg>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                {['Sort: Newest - Oldest', 'Sort: Oldest - Newest'].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortOrder(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left text-sm font-medium transition ${
                        sortOrder === option
                          ? 'bg-[#244D3F] text-white'
                          : 'text-[#1F2937] hover:bg-[#244D3F]/10 hover:text-[#244D3F]'
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  {getIcon(entry.type)}
                </div>

                <div>
                  <h3 className="font-medium text-[#1F2937]">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              No timeline entries found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
