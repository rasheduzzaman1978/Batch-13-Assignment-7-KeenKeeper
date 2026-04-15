'use client';

export default function TimelineSortDropdown({
  sortOrder,
  setSortOrder,
  isSortDropdownOpen,
  setIsSortDropdownOpen,
}) {
  return (
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
  );
}