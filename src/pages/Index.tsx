import React, { useState, useEffect } from 'react';
import { useKeySequence } from '@/hooks/useKeySequence';
import { EasterEgg } from '@/components/EasterEgg';
import { Terminal } from '@/components/Terminal';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Index = () => {
  const { toast } = useToast();
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  
  // Define key sequences for easter eggs
  const keySequences = {
    sparkles: ['s', 'p', 'a'],
    ghost: ['b', 'o', 'o'],
    rabbit: ['h', 'o', 'p'],
    lightbulb: ['n', 'i', 'g', 'h', 't'],
    terminal: ['h', 'a', 'c', 'k'],
    about: ['a', 'b', 'o', 'u', 't'],
    exit: ['e', 'x', 'i', 't'],
  };
  
  // Handler functions for each sequence
  const sequenceHandlers = {
    sparkles: () => {
      setActiveEgg('sparkles');
      toast({
        title: "Sparkles activated!",
        description: "You found a hidden animation.",
      });
    },
    ghost: () => {
      setActiveEgg('ghost');
      toast({
        title: "Ghost appeared!",
        description: "Something spooky is happening.",
      });
    },
    rabbit: () => {
      setActiveEgg('rabbit');
      toast({
        title: "Rabbit found!",
        description: "You've gone down the rabbit hole.",
      });
    },
    lightbulb: () => {
      setActiveEgg('lightbulb');
      toast({
        title: "Lights out mode",
        description: "You've found the night mode easter egg.",
      });
    },
    terminal: () => {
      setActiveEgg('terminal');
      toast({
        title: "Terminal mode",
        description: "Hacker mode activated.",
      });
    },
    about: () => {
      setActiveEgg('about');
      toast({
        title: "About screen",
        description: "You've found the secret about page.",
      });
    },
    exit: () => {
      setShowTerminal(true);
      toast({
        title: "Terminal activated",
        description: "Type 'help' to see available commands.",
      });
    },
  };
  
  // Initialize key sequence hook
  const { pressedKeys, checkSequences, resetKeys } = useKeySequence(keySequences);
  
  // Check for matching sequences
  useEffect(() => {
    checkSequences(sequenceHandlers);
  }, [pressedKeys]);
  
  // Close active egg with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeEgg) {
        setActiveEgg(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEgg]);
  
  // Handle the initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Central content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center p-8"
      >
        <motion.h1 
          className="text-3xl font-light text-gray-800 tracking-wider mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          nothing to see here
        </motion.h1>
        
        <motion.p
          className="text-sm text-gray-400 max-w-md mx-auto tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          or is there?
        </motion.p>
      </motion.div>
      
      {/* Sequence indicator */}
      {pressedKeys.length > 0 && (
        <div className={`key-sequence-indicator ${pressedKeys.length > 0 ? 'active' : ''}`}>
          {pressedKeys.join('')}
        </div>
      )}
      
      {/* Easter eggs */}
      <EasterEgg type="sparkles" isVisible={activeEgg === 'sparkles'} />
      <EasterEgg type="ghost" isVisible={activeEgg === 'ghost'} />
      <EasterEgg type="rabbit" isVisible={activeEgg === 'rabbit'} />
      <EasterEgg type="lightbulb" isVisible={activeEgg === 'lightbulb'} />
      <EasterEgg type="terminal" isVisible={activeEgg === 'terminal'} />
      <EasterEgg type="about" isVisible={activeEgg === 'about'} />
      
      {/* Terminal */}
      <Terminal isVisible={showTerminal} onClose={() => setShowTerminal(false)} />
      
      {/* Initial page animation */}
      <motion.div
        className="fixed inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isInitialLoad ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Index;
