
'use client';

import { createContext, useContext } from 'react';
import friends from '@/data/friends.json';

const FriendsContext = createContext();

export function FriendsProvider({ children }) {
  return (
    <FriendsContext.Provider value={{ friends }}>
      {children}
    </FriendsContext.Provider>
  );
}

export const useFriends = () => useContext(FriendsContext);