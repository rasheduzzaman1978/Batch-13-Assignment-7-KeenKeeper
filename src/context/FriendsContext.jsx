'use client';

// React থেকে createContext এবং useContext import করা হয়েছে
// createContext → নতুন context তৈরি করার জন্য
// useContext → context এর data access করার জন্য
import { createContext, useContext } from 'react';

// friends.json file থেকে friends data import করা হয়েছে
// এখানে friend সম্পর্কিত সব data থাকবে
import friends from '@/data/friends.json';

// নতুন FriendsContext তৈরি করা হয়েছে
// শুরুতে এর কোনো default value নেই
const FriendsContext = createContext();

// FriendsProvider component
// এটি app এর child component গুলোকে friends data provide করবে
export function FriendsProvider({ children }) {
  return (
    // FriendsContext.Provider এর মাধ্যমে friends data pass করা হচ্ছে
    <FriendsContext.Provider value={{ friends }}>
      {/* যেসব child component Provider এর ভিতরে থাকবে */}
      {/* তারা সবাই useFriends hook এর মাধ্যমে friends data access করতে পারবে */}
      {children}
    </FriendsContext.Provider>
  );
}

// Custom hook তৈরি করা হয়েছে
// useFriends ব্যবহার করে যেকোনো component FriendsContext এর data access করতে পারবে
export const useFriends = () => useContext(FriendsContext);

