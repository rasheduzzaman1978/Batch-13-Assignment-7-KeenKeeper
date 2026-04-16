'use client';

// বিভিন্ন context provider import করা হয়েছে
// TimelineProvider → timeline related data provide করবে
// FriendsProvider → friends related data provide করবে
// UIProvider → UI related state provide করবে
import { TimelineProvider } from '@/context/TimelineContext';
import { FriendsProvider } from '@/context/FriendsContext';
import { UIProvider } from '@/context/UIContext';

// AppProviders component
// এটি app এর সব provider একসাথে wrap করার জন্য ব্যবহার করা হয়
export default function AppProviders({ children }) {
  return (
    // UIProvider সবচেয়ে বাইরে রাখা হয়েছে
    // যাতে পুরো app এর UI state globally access করা যায়
    <UIProvider>
      {/* FriendsProvider friends data globally provide করবে */}
      <FriendsProvider>
        {/* TimelineProvider timeline data globally provide করবে */}
        <TimelineProvider>{children}</TimelineProvider>
      </FriendsProvider>
    </UIProvider>
  );
}

