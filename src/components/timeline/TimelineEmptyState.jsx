'use client';

// TimelineEmptyState component
// যখন timeline এ কোনো entry পাওয়া যাবে না তখন এই component show হবে
export default function TimelineEmptyState() {
  return (
    // Empty state container
    // dashed border ব্যবহার করা হয়েছে যাতে এটি normal card থেকে আলাদা দেখায়
    // text-center দিয়ে text মাঝখানে রাখা হয়েছে
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
      {/* কোনো timeline entry না থাকলে এই message show হবে */}
      No timeline entries found.
    </div>
  );
}

