
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Ghost, Rabbit, LightbulbOff, Key, Command } from 'lucide-react';

interface EasterEggProps {
  type: 'sparkles' | 'ghost' | 'rabbit' | 'lightbulb' | 'terminal' | 'about';
  isVisible: boolean;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ type, isVisible }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isVisible) {
      // Randomize position for some easter eggs
      if (['sparkles', 'ghost', 'rabbit'].includes(type)) {
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) + 100;
        setPosition({ x, y });
      }
    }
  }, [isVisible, type]);
  
  // Different easter egg contents based on type
  const renderEasterEggContent = () => {
    switch (type) {
      case 'sparkles':
        return (
          <motion.div 
            className="fixed glass-panel p-6"
            style={{ top: position.y, left: position.x }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <Sparkles className="h-10 w-10 text-amber-500 animate-float" />
              <h3 className="mt-3 text-xl font-medium">Magic Found!</h3>
              <p className="mt-2 text-sm text-gray-600">You discovered a hidden sparkle.</p>
            </div>
          </motion.div>
        );
        
      case 'ghost':
        return (
          <motion.div 
            className="fixed glass-panel p-6"
            style={{ top: position.y, left: position.x }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring' }}
          >
            <div className="flex flex-col items-center">
              <Ghost className="h-10 w-10 text-purple-400 animate-float" />
              <h3 className="mt-3 text-xl font-medium">Boo!</h3>
              <p className="mt-2 text-sm text-gray-600">A friendly ghost appeared.</p>
            </div>
          </motion.div>
        );
        
      case 'rabbit':
        return (
          <motion.div 
            className="fixed glass-panel p-6"
            style={{ top: position.y, left: position.x }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <Rabbit className="h-10 w-10 text-pink-400 animate-float" />
              <h3 className="mt-3 text-xl font-medium">Down the Rabbit Hole</h3>
              <p className="mt-2 text-sm text-gray-600">How deep does it go?</p>
            </div>
          </motion.div>
        );
        
      case 'lightbulb':
        return (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-panel p-8 max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex flex-col items-center">
                <LightbulbOff className="h-12 w-12 text-yellow-400 mb-4" />
                <h2 className="text-2xl font-medium mb-2">Lights Out Mode</h2>
                <p className="text-center text-gray-600">
                  Working late? This hidden mode is easier on the eyes.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="h-4 w-4 rounded-full bg-gray-200"
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut" 
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'terminal':
        return (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-black rounded-lg p-6 w-full max-w-2xl border border-gray-700 shadow-2xl font-mono"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-gray-400 text-sm flex items-center">
                  <Key className="h-3 w-3 mr-1" />
                  <span>Terminal</span>
                </div>
              </div>
              
              <div className="text-green-400 text-sm">
                <TerminalText />
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'about':
        return (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg p-8 max-w-xl shadow-2xl border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-medium">About Me</h2>
                  <p className="text-gray-500 mt-1">Hidden details about the site creator</p>
                </div>
                <Command className="h-6 w-6 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  I'm a designer and developer who loves creating minimal, elegant solutions.
                  This website intentionally starts with almost nothing, rewarding the curious
                  with hidden experiences.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">HIDDEN KEYS</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><span className="font-mono bg-gray-200 px-1 rounded">spa</span> - Sparkles animation</li>
                    <li><span className="font-mono bg-gray-200 px-1 rounded">boo</span> - Ghost appearance</li>
                    <li><span className="font-mono bg-gray-200 px-1 rounded">hop</span> - Follow the rabbit</li>
                    <li><span className="font-mono bg-gray-200 px-1 rounded">night</span> - Lights out mode</li>
                    <li><span className="font-mono bg-gray-200 px-1 rounded">hack</span> - Terminal mode</li>
                    <li><span className="font-mono bg-gray-200 px-1 rounded">about</span> - This screen</li>
                  </ul>
                </div>
                
                <p className="text-gray-500 text-sm">
                  Press any key to close this dialog and continue exploring.
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && renderEasterEggContent()}
    </AnimatePresence>
  );
};

// Typing animation for the terminal
const TerminalText = () => {
  const [text, setText] = useState('');
  const fullText = `> Initializing system...\n> Accessing hidden files...\n> Welcome to the secret terminal.\n> This website contains 6 easter eggs.\n> Have you found them all yet?\n> Type 'exit' or press Escape to return.`;
  
  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;
    
    const typeNextCharacter = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Random typing speed
        const delay = Math.random() * 30 + 20;
        timer = setTimeout(typeNextCharacter, delay);
      }
    };
    
    typeNextCharacter();
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="whitespace-pre-line">
      {text}
      <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
    </div>
  );
};
