import { notFound } from 'next/navigation';

import friends from '@/data/friends.json';
import FriendDetailsPageClient from './FriendDetailsPageClient';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const isValidId =
    /^\d+$/.test(resolvedParams.id) && Number.isInteger(id);

  const friend = isValidId
    ? friends.find((item) => item.id === id)
    : null;

  if (!friend) {
    notFound();
  }

  return {
    title: friend?.name || 'Friend Details',
  };
}

export default function Page({ params }) {
  return <FriendDetailsPageClient params={params} />;
}