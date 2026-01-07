import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Match {
  id: string;
  userId: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  matchedAt: string;
  lastMessage?: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface MatchContextType {
  matches: Match[];
  messages: Message[];
  addMatch: (match: Omit<Match, 'id' | 'matchedAt'>) => void;
  sendMessage: (matchId: string, content: string) => void;
  getMessages: (matchId: string) => Message[];
  markMessagesAsRead: (matchId: string) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};

interface MatchProviderProps {
  children: ReactNode;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMatch = (matchData: Omit<Match, 'id' | 'matchedAt'>) => {
    const newMatch: Match = {
      ...matchData,
      id: Date.now().toString(),
      matchedAt: new Date().toISOString()
    };
    setMatches(prev => [...prev, newMatch]);
  };

  const sendMessage = (matchId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      matchId,
      senderId: 'current-user', // Would come from auth context
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update last message in match
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, lastMessage: content, unreadCount: 0 }
        : match
    ));
  };

  const getMessages = (matchId: string): Message[] => {
    return messages.filter(msg => msg.matchId === matchId);
  };

  const markMessagesAsRead = (matchId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.matchId === matchId ? { ...msg, read: true } : msg
    ));
    
    setMatches(prev => prev.map(match => 
      match.id === matchId ? { ...match, unreadCount: 0 } : match
    ));
  };

  const value: MatchContextType = {
    matches,
    messages,
    addMatch,
    sendMessage,
    getMessages,
    markMessagesAsRead
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};
