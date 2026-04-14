'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export default function StatsPage() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const timelineEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    const callCount = timelineEntries.filter(
      (item) => item.type === 'Call'
    ).length;

    const textCount = timelineEntries.filter(
      (item) => item.type === 'Text'
    ).length;

    const videoCount = timelineEntries.filter(
      (item) => item.type === 'Video'
    ).length;

    setChartData([
      { name: 'Text', value: textCount },
      { name: 'Call', value: callCount },
      { name: 'Video', value: videoCount },
    ]);
  }, []);

  const COLORS = ['#7C3AED', '#1F5B4F', '#3CB371'];

  return (
    <main className="min-h-screen bg-[#f5f7f8] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <h1 className="mb-8 text-3xl font-bold text-[#1F2937] md:text-4xl lg:text-5xl">
          Friendship Analytics
        </h1>

        {/* Chart Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-base font-medium text-[#244D3F] md:text-[18px] lg:text-xl">
            By Interaction Type
          </h2>

          <div className="flex justify-center overflow-x-auto">
            <PieChart width={400} height={320}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

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