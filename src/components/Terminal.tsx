
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ isVisible, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '> Welcome to mini-terminal v1.0',
    '> Type "help" for available commands',
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when terminal becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Command processor
  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, `$ ${command}`]);
    
    // Process command
    if (command === '') {
      return;
    } else if (command === 'help') {
      setHistory(prev => [
        ...prev, 
        '  Available commands:',
        '  help     - Show this help menu',
        '  clear    - Clear terminal screen',
        '  date     - Show current date and time',
        '  echo     - Echo text back to terminal',
        '  exit     - Close the terminal',
        '  ls       - List directory contents (fake)',
        '  whoami   - Display current user',
      ]);
    } else if (command === 'clear') {
      setHistory([]);
    } else if (command === 'date') {
      setHistory(prev => [...prev, `  ${new Date().toString()}`]);
    } else if (command.startsWith('echo ')) {
      const text = command.substring(5);
      setHistory(prev => [...prev, `  ${text}`]);
    } else if (command === 'exit') {
      onClose();
    } else if (command === 'ls') {
      setHistory(prev => [
        ...prev,
        '  Documents/  Pictures/  Music/',
        '  secret.txt  notes.md  config.json'
      ]);
    } else if (command === 'whoami') {
      setHistory(prev => [...prev, '  guest-user']);
    } else {
      setHistory(prev => [...prev, `  Command not found: ${command}`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-black w-full max-w-3xl rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-700">
          <TerminalIcon className="h-4 w-4 text-gray-400" />
          <span className="text-gray-300 text-sm font-mono">mini-terminal</span>
          <div className="flex-1"></div>
          <button 
            className="h-5 w-5 flex items-center justify-center rounded hover:bg-gray-700 text-gray-400 hover:text-gray-200"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        
        {/* Terminal output */}
        <div 
          ref={terminalRef}
          className="bg-black text-green-400 p-4 font-mono text-sm h-[350px] overflow-y-auto"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
          ))}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-none outline-none text-green-400 font-mono"
              autoFocus
            />
            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
