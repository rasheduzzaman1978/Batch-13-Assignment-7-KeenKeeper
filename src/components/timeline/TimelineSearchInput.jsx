'use client';

// TimelineSearchInput component
// এটি timeline entry search করার input field হিসেবে কাজ করবে
export default function TimelineSearchInput({
  searchTerm,
  setSearchTerm,
  onSearch,
}) {
  return (
    // Input wrapper
    // full width থাকবে, তবে large screen এ max width থাকবে
    <div className="w-full lg:max-w-md">
      <div className="flex items-center gap-2">
        <input
          // Input type text
          type="text"

          // Placeholder text
          placeholder="Search by friend name or interaction type..."

          // Input এর বর্তমান value
          value={searchTerm}

          // Input change হলে searchTerm state update হবে
          onChange={(e) => setSearchTerm(e.target.value)}

          // Enter press করলে search হবে
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}

          // Input styling
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          className="btn rounded-lg bg-[#244D3F] px-5 py-3 text-sm font-medium cursor-pointer text-white transition hover:bg-[#1d3d32]"
        >
          Search
        </button>
      </div>
    </div>
  );
}

