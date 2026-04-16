'use client';

// TimelineSearchInput component
// এটি timeline entry search করার input field হিসেবে কাজ করবে
export default function TimelineSearchInput({
  searchTerm,
  setSearchTerm,
}) {
  return (
    // Input wrapper
    // full width থাকবে, তবে large screen এ max width থাকবে
    <div className="w-full lg:max-w-md">
      <input
        // Input type text
        type="text"

        // Placeholder text
        placeholder="Search by friend name or interaction type..."

        // Input এর বর্তমান value
        value={searchTerm}

        // Input change হলে searchTerm state update হবে
        onChange={(e) => setSearchTerm(e.target.value)}

        // Input styling
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
      />
    </div>
  );
}

