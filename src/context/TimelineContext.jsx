'use client';

// React থেকে createContext, useContext, useEffect, useState import করা হয়েছে
// createContext → নতুন context তৈরি করার জন্য
// useContext → context data access করার জন্য
// useEffect → component render হওয়ার পরে side effect চালানোর জন্য
// useState → state manage করার জন্য
import { createContext, useContext, useEffect, useState } from 'react';

// নতুন TimelineContext তৈরি করা হয়েছে
// শুরুতে এর কোনো default value নেই
const TimelineContext = createContext();

// TimelineProvider component
// এটি app এর child component গুলোকে timeline data provide করবে
export function TimelineProvider({ children }) {
  // timelineEntries state
  // timeline এর সব entry এখানে store হবে
  const [timelineEntries, setTimelineEntries] = useState([]);

  // Component প্রথমবার render হওয়ার পরে localStorage থেকে data load করা হবে
  useEffect(() => {
    // localStorage থেকে timelineEntries আনা হচ্ছে
    // যদি data না থাকে তাহলে default হিসেবে empty array [] নেওয়া হচ্ছে
    const savedEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    // timelineEntries state update করা হচ্ছে
    setTimelineEntries(savedEntries);
  }, []);

  // নতুন timeline entry add করার function
  const addTimelineEntry = (entry) => {
    // নতুন entry শুরুতে add করা হচ্ছে
    // তাই latest entry list এর উপরে থাকবে
    const updatedEntries = [entry, ...timelineEntries];

    // State update করা হচ্ছে
    setTimelineEntries(updatedEntries);

    // Updated data localStorage এ save করা হচ্ছে
    localStorage.setItem(
      'timelineEntries',
      JSON.stringify(updatedEntries)
    );
  };

  // নির্দিষ্ট id অনুযায়ী timeline entry delete করার function
  const deleteTimelineEntry = (id) => {
    // যেসব entry এর id match করবে না শুধু সেগুলো রাখা হবে
    const updatedEntries = timelineEntries.filter(
      (entry) => entry.id !== id
    );

    // State update করা হচ্ছে
    setTimelineEntries(updatedEntries);

    // Updated data localStorage এ save করা হচ্ছে
    localStorage.setItem(
      'timelineEntries',
      JSON.stringify(updatedEntries)
    );
  };

  // সব timeline entry clear করার function
  const clearTimeline = () => {
    // State empty array করে দেওয়া হচ্ছে
    setTimelineEntries([]);

    // localStorage থেকে timelineEntries remove করা হচ্ছে
    localStorage.removeItem('timelineEntries');
  };

  return (
    // TimelineContext.Provider এর মাধ্যমে data এবং function pass করা হচ্ছে
    <TimelineContext.Provider
      value={{
        timelineEntries,
        addTimelineEntry,
        deleteTimelineEntry,
        clearTimeline,
      }}
    >
      {/* যেসব child component Provider এর ভিতরে থাকবে */}
      {/* তারা সবাই useTimeline hook এর মাধ্যমে timeline data access করতে পারবে */}
      {children}
    </TimelineContext.Provider>
  );
}

// Custom hook তৈরি করা হয়েছে
// useTimeline ব্যবহার করে যেকোনো component TimelineContext এর data access করতে পারবে
export const useTimeline = () => useContext(TimelineContext);

