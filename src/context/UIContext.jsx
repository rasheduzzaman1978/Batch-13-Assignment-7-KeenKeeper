'use client';

// React থেকে createContext, useContext, useState import করা হয়েছে
// createContext → নতুন context তৈরি করার জন্য
// useContext → context data access করার জন্য
// useState → state manage করার জন্য
import { createContext, useContext, useState } from 'react';

// নতুন UIContext তৈরি করা হয়েছে
// শুরুতে এর কোনো default value নেই
const UIContext = createContext();

// UIProvider component
// এটি app এর child component গুলোকে UI related state provide করবে
export function UIProvider({ children }) {
  // Sidebar open/close state
  // শুরুতে false মানে sidebar বন্ধ থাকবে
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar toggle করার function
  // যদি sidebar open থাকে তাহলে close হবে
  // আর close থাকলে open হবে
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    // UIContext.Provider এর মাধ্যমে state এবং function pass করা হচ্ছে
    <UIContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {/* যেসব child component Provider এর ভিতরে থাকবে */}
      {/* তারা সবাই useUI hook এর মাধ্যমে UI state access করতে পারবে */}
      {children}
    </UIContext.Provider>
  );
}

// Custom hook তৈরি করা হয়েছে
// useUI ব্যবহার করে যেকোনো component UIContext এর data access করতে পারবে
export const useUI = () => useContext(UIContext);