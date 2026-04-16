
// Next.js এর Image component import করা হয়েছে
// এটি optimized image loading এর জন্য ব্যবহার করা হয়
import Image from 'next/image';

// Next.js এর Link component import করা হয়েছে
// page reload ছাড়াই client-side navigation এর জন্য ব্যবহার হয়
import Link from 'next/link';

// friends.json file থেকে friends data import করা হয়েছে
// এখানে প্রতিটি friend এর id, name, picture, tags, status ইত্যাদি থাকবে
import friends from '@/data/friends.json';

// Main FriendsSection component
export default function FriendsSection() {
  // Friend status অনুযায়ী badge এর style return করার function
  const getStatusStyle = (status) => {
    switch (status) {
      // যদি status overdue হয়
      // তাহলে red background এবং white text হবে
      case 'overdue':
        return 'bg-red-500 text-white';

      // যদি status almost due হয়
      // তাহলে yellow background এবং white text হবে
      case 'almost due':
        return 'bg-yellow-400 text-white';

      // যদি status on-track হয়
      // তাহলে green background এবং white text হবে
      case 'on-track':
        return 'bg-green-700 text-white';

      // যদি status unknown বা অন্য কিছু হয়
      // তাহলে default gray style apply হবে
      default:
        return 'bg-gray-300 text-black';
    }
  };

  // JSX UI return করা হচ্ছে
  return (
    // পুরো friends section wrapper
    // background color এবং responsive padding apply করা হয়েছে
    <section className="bg-[#f5f7f8] px-4 py-6 md:py-12 md:px-8 lg:px-12">
      {/* Content container center aligned */}
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <h2 className="mb-6 text-xl md:text-2xl font-semibold text-[#1F2937]">
          Your Friends
        </h2>

        {/* Friends card grid layout */}
        {/* ছোট screen এ 2 column, medium এ 3 column, large এ 4 column */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* friends array এর প্রতিটি item এর জন্য card render করা হচ্ছে */}
          {friends.map((friend) => (
            <Link
              // প্রতিটি card এর unique key
              key={friend.id}

              // friend details page এ navigate করবে
              href={`/friends/${friend.id}`}

              // card styling
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card content vertically center aligned */}
              <div className="flex flex-col items-center text-center">
                {/* Friend profile image wrapper */}
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    // Friend image source
                    src={friend.picture}

                    // Accessibility এর জন্য alt text
                    alt={friend.name}

                    // পুরো parent container fill করবে
                    fill

                    // Responsive image size
                    sizes="(max-width: 768px) 80px, 96px"

                    // Image crop হয়ে cover style এ দেখাবে
                    className="object-cover"
                  />
                </div>

                {/* Friend name */}
                <h3 className="mt-4 text-base md:text-xl font-semibold text-[#1F2937]">
                  {friend.name}
                </h3>

                {/* কতদিন আগে last contact হয়েছে */}
                <p className="mt-2 text-xs text-gray-400">
                  {friend.days_since_contact}d ago
                </p>

                {/* Friend tags section */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {/* প্রতিটি tag এর জন্য badge render করা হচ্ছে */}
                  {friend.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium uppercase text-[#244D3F]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Friend status badge */}
                <div
                  className={`mt-4 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                    friend.status
                  )}`}
                >
                  {/* Friend এর status text show করবে */}
                  {friend.status}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

