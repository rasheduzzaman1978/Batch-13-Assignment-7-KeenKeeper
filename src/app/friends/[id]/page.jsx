import friends from '@/data/friends.json';
import FriendDetailsPageClient from './FriendDetailsPageClient';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const friend = friends.find(
    (item) => item.id === parseInt(resolvedParams.id)
  );

  return {
    title: friend?.name || 'Friend Details',
  };
}

export default function Page({ params }) {
  return <FriendDetailsPageClient params={params} />;
}