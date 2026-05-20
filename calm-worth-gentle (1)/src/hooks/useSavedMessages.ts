import { useState, useEffect, useCallback } from 'react';
import { WorthyMessage } from '@/data/worthyMessages';

export interface SavedMessage extends WorthyMessage {
  savedAt: string;
  note?: string;
}

const STORAGE_KEY = 'worthy365_saved_messages';

export const useSavedMessages = () => {
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedMessages(parsed);
      }
    } catch (error) {
      console.error('Error loading saved messages:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedMessages changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessages));
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    }
  }, [savedMessages, isLoaded]);

  const saveMessage = useCallback((message: WorthyMessage) => {
    setSavedMessages(prev => {
      // Check if already saved
      if (prev.some(m => m.id === message.id)) {
        return prev;
      }
      const newSaved: SavedMessage = {
        ...message,
        savedAt: new Date().toISOString(),
      };
      return [newSaved, ...prev];
    });
  }, []);

  const unsaveMessage = useCallback((messageId: number) => {
    setSavedMessages(prev => prev.filter(m => m.id !== messageId));
  }, []);

  const toggleSaved = useCallback((message: WorthyMessage) => {
    const isSaved = savedMessages.some(m => m.id === message.id);
    if (isSaved) {
      unsaveMessage(message.id);
    } else {
      saveMessage(message);
    }
  }, [savedMessages, saveMessage, unsaveMessage]);

  const isMessageSaved = useCallback((messageId: number) => {
    return savedMessages.some(m => m.id === messageId);
  }, [savedMessages]);

  const addNote = useCallback((messageId: number, note: string) => {
    setSavedMessages(prev => 
      prev.map(m => m.id === messageId ? { ...m, note } : m)
    );
  }, []);

  const clearAllSaved = useCallback(() => {
    setSavedMessages([]);
  }, []);

  const getSavedByTheme = useCallback((theme: string) => {
    if (theme === 'all') return savedMessages;
    return savedMessages.filter(m => m.theme === theme);
  }, [savedMessages]);

  return {
    savedMessages,
    saveMessage,
    unsaveMessage,
    toggleSaved,
    isMessageSaved,
    addNote,
    clearAllSaved,
    getSavedByTheme,
    isLoaded,
  };
};

export default useSavedMessages;
