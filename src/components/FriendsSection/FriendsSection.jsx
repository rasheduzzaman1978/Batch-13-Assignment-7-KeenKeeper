import Image from 'next/image';
import Link from 'next/link';
import friends from '@/data/friends.json';

export default function FriendsSection() {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-500 text-white';
      case 'almost due':
        return 'bg-yellow-400 text-white';
      case 'on-track':
        return 'bg-green-700 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <section className="bg-[#f5f7f8] px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl md:text-2xl font-semibold text-[#1F2937]">
          Your Friends
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/friends/${friend.id}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={friend.picture}
                    alt={friend.name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-4 text-base md:text-xl font-semibold text-[#1F2937]">
                  {friend.name}
                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  {friend.days_since_contact}d ago
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {friend.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium uppercase text-[#244D3F]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-4 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                    friend.status
                  )}`}
                >
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