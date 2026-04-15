import { FaPlus } from 'react-icons/fa';

export default function Banner() {
  const summaryCards = [
    {
      number: 10,
      label: 'Total Friends',
    },
    {
      number: 3,
      label: 'On Track',
    },
    {
      number: 6,
      label: 'Need Attention',
    },
    {
      number: 12,
      label: 'Interactions This Month',
    },
  ];

  return (
    <section className="bg-[#f5f7f8] px-4 py-6 md:py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl text-center">
        {/* Title */}
        <h1 className="text-[28px] sm:text-4xl md:text-[45px] lg:text-5xl font-bold text-[#1F2937]">
          Friends to keep close in your life
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[#64748B] md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Button */}
        <div className="mt-8">
          <button className="btn border-none bg-[#244D3F] text-white hover:bg-[#1e3f34]">
            <FaPlus className="text-xs" />
            Add a Friend
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border border-gray-200 bg-white px-6 py-8 shadow-sm"
            >
              <h2 className="text-2xl md:text-[32px] font-semibold text-[#244D3F]">
                {card.number}
              </h2>
              <p className="mt-2 text-base md:text-[18px] text-[#6b7280]">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}