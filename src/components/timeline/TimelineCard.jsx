'use client';

// Next.js এর Image component import করা হয়েছে
// এটি optimized image loading এর জন্য ব্যবহার করা হয়
import Image from 'next/image';

// আলাদা interaction type এর icon image import করা হয়েছে
// callImg → Call type entry এর icon
// textImg → Text type entry এর icon
// videoImg → Video type entry এর icon
import callImg from '@/assets/call.png';
import textImg from '@/assets/text.png';
import videoImg from '@/assets/video.png';

// TimelineCard component
// এটি entry prop receive করবে
export default function TimelineCard({ entry }) {
  // Entry type অনুযায়ী icon return করার function
  const getIcon = (type) => {
    switch (type) {
      // যদি type = 'Call' হয়
      case 'Call':
        return (
          <Image
            // Call icon image source
            src={callImg}

            // Accessibility এর জন্য alt text
            alt="Call"

            // Image width
            width={20}

            // Image height
            height={20}

            // Image container এর মধ্যে fit থাকবে
            className="object-contain"
          />
        );

      // যদি type = 'Text' হয়
      case 'Text':
        return (
          <Image
            // Text icon image source
            src={textImg}
            alt="Text"
            width={20}
            height={20}
            className="object-contain"
          />
        );

      // যদি type = 'Video' হয়
      case 'Video':
        return (
          <Image
            // Video icon image source
            src={videoImg}
            alt="Video"
            width={20}
            height={20}
            className="object-contain"
          />
        );

      // যদি type unknown হয়
      // তাহলে কিছুই return করবে না
      default:
        return null;
    }
  };

  // JSX UI return করা হচ্ছে
  return (
    // পুরো timeline card wrapper
    // flex ব্যবহার করে icon এবং text পাশাপাশি রাখা হয়েছে
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
      {/* Icon container */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        {/* Entry type অনুযায়ী icon render হবে */}
        {getIcon(entry.type)}
      </div>

      {/* Entry information section */}
      <div>
        {/* Entry title */}
        <h3 className="font-medium text-[#1F2937]">
          {entry.title}
        </h3>

        {/* Entry date */}
        <p className="text-sm text-gray-500">{entry.date}</p>
      </div>
    </div>
  );
}

