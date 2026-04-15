
'use client';

export default function TimelineSearchInput({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="w-full lg:max-w-md">
      <input
        type="text"
        placeholder="Search by friend name or interaction type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#244D3F] focus:ring-2 focus:ring-[#244D3F]/20"
      />
    </div>
  );
}