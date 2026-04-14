'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [timelineEntries, setTimelineEntries] = useState([]);

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem('timelineEntries')) || [];

    setTimelineEntries(savedEntries);
  }, []);

  const addTimelineEntry = (entry) => {
    const updatedEntries = [entry, ...timelineEntries];

    setTimelineEntries(updatedEntries);

    localStorage.setItem(
      'timelineEntries',
      JSON.stringify(updatedEntries)
    );
  };

  const deleteTimelineEntry = (id) => {
    const updatedEntries = timelineEntries.filter(
      (entry) => entry.id !== id
    );

    setTimelineEntries(updatedEntries);

    localStorage.setItem(
      'timelineEntries',
      JSON.stringify(updatedEntries)
    );
  };

  const clearTimeline = () => {
    setTimelineEntries([]);
    localStorage.removeItem('timelineEntries');
  };

  return (
    <TimelineContext.Provider
      value={{
        timelineEntries,
        addTimelineEntry,
        deleteTimelineEntry,
        clearTimeline,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimeline = () => useContext(TimelineContext);



