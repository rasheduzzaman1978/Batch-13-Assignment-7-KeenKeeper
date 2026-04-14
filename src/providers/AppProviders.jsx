
'use client';

import { TimelineProvider } from '@/context/TimelineContext';
import { FriendsProvider } from '@/context/FriendsContext';
import { UIProvider } from '@/context/UIContext';

export default function AppProviders({ children }) {
  return (
    <UIProvider>
      <FriendsProvider>
        <TimelineProvider>{children}</TimelineProvider>
      </FriendsProvider>
    </UIProvider>
  );
}