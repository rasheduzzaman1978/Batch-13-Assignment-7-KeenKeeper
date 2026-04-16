'use client';

// React থেকে useEffect এবং useState hook import করা হয়েছে
// useState → component এর state manage করার জন্য
// useEffect → component render হওয়ার পরে side effect চালানোর জন্য
import { useEffect, useState } from 'react';

// Recharts library থেকে chart-related component import করা হয়েছে
// PieChart → পুরো pie chart container
// Pie → actual pie/donut shape render করে
// Cell → pie chart এর প্রতিটি অংশের color আলাদা করতে ব্যবহৃত হয়
// Tooltip → hover করলে data দেখায়
// Legend → chart এর নিচে label দেখায়
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

// Main component
export default function StatsPage() {
  // chartData নামে একটি state তৈরি করা হয়েছে
  // শুরুতে এটি empty array [] থাকবে
  // পরে localStorage থেকে data নিয়ে setChartData দিয়ে update করা হবে
  const [chartData, setChartData] = useState([]);

  // useEffect component প্রথমবার render হওয়ার পরে execute হবে
  // কারণ dependency array [] খালি দেওয়া হয়েছে
  useEffect(() => {
    // localStorage থেকে timelineEntries data আনা হচ্ছে
    // JSON.parse দিয়ে string কে array/object এ convert করা হচ্ছে
    // যদি localStorage-এ কিছু না থাকে, তাহলে default হিসেবে [] নেওয়া হচ্ছে
    const timelineEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    // timelineEntries array থেকে যেসব item.type === 'Call'
    // সেগুলোর সংখ্যা count করা হচ্ছে
    const callCount = timelineEntries.filter(
      (item) => item.type === 'Call'
    ).length;

    // timelineEntries array থেকে যেসব item.type === 'Text'
    // সেগুলোর সংখ্যা count করা হচ্ছে
    const textCount = timelineEntries.filter(
      (item) => item.type === 'Text'
    ).length;

    // timelineEntries array থেকে যেসব item.type === 'Video'
    // সেগুলোর সংখ্যা count করা হচ্ছে
    const videoCount = timelineEntries.filter(
      (item) => item.type === 'Video'
    ).length;

    // chartData state update করা হচ্ছে
    // প্রতিটি interaction type এর জন্য name এবং value রাখা হচ্ছে
    setChartData([
      { name: 'Text', value: textCount },
      { name: 'Call', value: callCount },
      { name: 'Video', value: videoCount },
    ]);
  }, []);

  // Pie chart এর প্রতিটি অংশের জন্য আলাদা color define করা হয়েছে
  // Text → Purple
  // Call → Dark Green
  // Video → Light Green
  const COLORS = ['#7C3AED', '#1F5B4F', '#3CB371'];

  // JSX UI return করা হচ্ছে
  return (
    // পুরো page এর main wrapper
    // মিনিমাম height, background color, padding responsive ভাবে সেট করা হয়েছে
    <main className="min-h-[70%] bg-[#f5f7f8] px-4 py-6 md:py-12 md:px-8 lg:px-12">
      {/* Container যাতে content center aligned থাকে */}
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <h1 className="mb-4 md:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937]">
          Friendship Analytics
        </h1>

        {/* Chart Card Container */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Chart section title */}
          <h2 className="mb-2 md:mb-6 text-base font-medium text-[#244D3F] md:text-[18px] lg:text-xl">
            By Interaction Type
          </h2>

          {/* Chart কে horizontally center align করা হয়েছে */}
          <div className="flex justify-center overflow-hidden">
            {/* PieChart container */}
            <PieChart width={400} height={320}>
              {/* Pie component data render করবে */}
              <Pie
                // chartData array থেকে data নেওয়া হচ্ছে
                data={chartData}

                // Chart এর horizontal center position
                cx="50%"

                // Chart এর vertical center position
                cy="50%"

                // Inner radius দিয়ে donut chart effect তৈরি করা হয়েছে
                innerRadius={70}

                // Outer radius pie chart এর size define করছে
                outerRadius={100}

                // প্রতিটি segment এর মাঝে spacing দেওয়া হয়েছে
                paddingAngle={4}

                // কোন property এর value অনুযায়ী chart render হবে
                dataKey="value"
              >
                {/* প্রতিটি data segment এর জন্য আলাদা color apply করা হচ্ছে */}
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              {/* Hover করলে value এবং label দেখাবে */}
              <Tooltip />

              {/* নিচে legend দেখাবে */}
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
            </PieChart>
          </div>
        </div>
      </div>
    </main>
  );
}

