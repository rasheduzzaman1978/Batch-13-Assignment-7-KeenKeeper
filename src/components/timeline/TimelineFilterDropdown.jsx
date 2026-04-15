'use client';

export default function TimelineFilterDropdown({
  selectedFilter,
  setSelectedFilter,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  return (
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
  );
}

