'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import callImg from '../../assets/call.png'
import textImg from '../../assets/text.png'
import videoImg from '../../assets/video.png'

export default function TimelinePage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    setEntries(savedEntries);
  }, []);

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
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1F2937]">
          Timeline
        </h1>

        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  {getIcon(entry.type)}
                </div>

                <div>
                  <h3 className="font-medium text-[#1F2937]">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {entry.date}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              No timeline entries yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}