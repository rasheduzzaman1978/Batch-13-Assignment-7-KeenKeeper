import dynamic from 'next/dynamic';
import Banner from '@/components/Banner/Banner';

const FriendsSection = dynamic(
  () => import('@/components/FriendsSection/FriendsSection'),
  {
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f5f7f8]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-[#244D3F]"></span>
          <p className="text-sm font-medium text-[#244D3F]">
            Loading friends...
          </p>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main className="bg-[#f5f7f8]">
      <Banner />
      <FriendsSection />
    </main>
  );
}