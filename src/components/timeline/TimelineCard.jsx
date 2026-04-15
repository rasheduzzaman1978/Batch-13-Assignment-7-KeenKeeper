
'use client';

import Image from 'next/image';
import callImg from '@/assets/call.png';
import textImg from '@/assets/text.png';
import videoImg from '@/assets/video.png';

export default function TimelineCard({ entry }) {
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
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
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
  );
}