
import { useState, useEffect, useCallback } from 'react';

type KeySequence = string[];
type SequenceMap = Record<string, () => void>;

export const useKeySequence = (sequences: Record<string, KeySequence>, timeout = 1500) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState<number>(0);
  
  // Create a map of joined sequences to their handlers
  const createSequenceMap = useCallback((handlers: Record<string, () => void>): SequenceMap => {
    const map: SequenceMap = {};
    
    Object.entries(sequences).forEach(([name, sequence]) => {
      if (handlers[name]) {
        map[sequence.join('')] = handlers[name];
      }
    });
    
    return map;
  }, [sequences]);
  
  // Define an effect to listen for key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if in input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      const key = e.key.toLowerCase();
      const currentTime = Date.now();
      
      // Clear sequence if timeout exceeded
      if (currentTime - lastKeyTime > timeout && pressedKeys.length > 0) {
        setPressedKeys([]);
      }
      
      setLastKeyTime(currentTime);
      
      // Add key to sequence - remove the check that prevents repeated characters
      setPressedKeys((prev) => [...prev, key]);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pressedKeys, lastKeyTime, timeout]);
  
  // Check for matching sequences
  const checkSequences = useCallback((handlers: Record<string, () => void>) => {
    const sequenceMap = createSequenceMap(handlers);
    const currentSequence = pressedKeys.join('');
    
    Object.entries(sequenceMap).forEach(([sequence, handler]) => {
      if (currentSequence.endsWith(sequence)) {
        handler();
        setPressedKeys([]);
      }
    });
  }, [pressedKeys, createSequenceMap]);
  
  return {
    pressedKeys,
    checkSequences,
    resetKeys: () => setPressedKeys([])
  };
};
