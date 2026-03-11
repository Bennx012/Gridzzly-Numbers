import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameConfig, GridNumber, GameStat } from '../types';
import { Timer, ArrowLeft } from 'lucide-react';

interface GameScreenProps {
  key?: string;
  config: GameConfig;
  onEnd: (stats: GameStat[], completed: boolean) => void;
  onBack: () => void;
}

const COLORS = ['#1a1a1a', '#21b4d9', '#f08c35', '#9829d9'];

export default function GameScreen({ config, onEnd, onBack }: GameScreenProps) {
  const [numbers, setNumbers] = useState<GridNumber[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [stats, setStats] = useState<GameStat[]>([]);
  const [lastClickTime, setLastClickTime] = useState<number>(Date.now());
  const [isTimeUp, setIsTimeUp] = useState(false);

  const statsRef = useRef<GameStat[]>([]);
  const currentNumberRef = useRef<number>(1);

  const totalNumbers = config.gridSize * config.gridSize;
  const isGameWon = currentNumber > totalNumbers;

  // Initialize grid
  useEffect(() => {
    const nums: GridNumber[] = Array.from({ length: totalNumbers }, (_, i) => ({
      value: i + 1,
      color: config.difficulty === 'colored' ? COLORS[Math.floor(Math.random() * COLORS.length)] : '#1a1a1a',
      found: false,
    }));

    // Shuffle
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    setNumbers(nums);
    setLastClickTime(Date.now());
    statsRef.current = [];
    currentNumberRef.current = 1;
  }, [config, totalNumbers]);

  // Timer countdown
  useEffect(() => {
    if (isTimeUp || isGameWon) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, isGameWon]);

  // Time up handler
  useEffect(() => {
    if (timeRemaining <= 0 && !isTimeUp) {
      setIsTimeUp(true);
      setTimeout(() => {
        onEnd(statsRef.current, false);
      }, 2000); // Wait for animation
    }
  }, [timeRemaining, isTimeUp, onEnd]);

  const handleNumberClick = (num: GridNumber, index: number) => {
    if (config.mode === 'read' || isTimeUp || isGameWon) return;

    if (num.value === currentNumberRef.current) {
      const now = Date.now();
      const timeTaken = (now - lastClickTime) / 1000;
      
      const newStat = { number: currentNumberRef.current, timeTaken };
      statsRef.current = [...statsRef.current, newStat];
      setStats(statsRef.current);
      
      setLastClickTime(now);
      
      const nextNumber = currentNumberRef.current + 1;
      currentNumberRef.current = nextNumber;
      setCurrentNumber(nextNumber);

      setNumbers((prev) => {
        const newNums = [...prev];
        newNums[index] = { ...newNums[index], found: true };
        return newNums;
      });

      if (nextNumber > totalNumbers) {
        // Game won
        setTimeout(() => {
          onEnd(statsRef.current, true);
        }, 500);
      }
    } else {
      // Wrong number clicked, maybe add a penalty or visual feedback?
      // For now, just ignore or flash red.
    }
  };

  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }[config.gridSize];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8a857e] hover:text-[#3d3935] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-[#f0ebe1]">
          <Timer className={`w-5 h-5 ${timeRemaining <= 5 ? 'text-red-500 animate-pulse' : 'text-[#3d3935]'}`} />
          <span className={`font-mono font-bold text-xl ${timeRemaining <= 5 ? 'text-red-500' : 'text-[#3d3935]'}`}>
            {timeRemaining}s
          </span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="w-full max-w-2xl flex flex-col items-center mt-12">
        {config.mode === 'game' && (
          <div className="mb-8 text-center">
            <p className="text-[#8a857e] text-sm font-medium uppercase tracking-widest mb-2">Find Number</p>
            <div className="text-5xl font-bold text-[#3d3935] font-mono">
              {currentNumber <= totalNumbers ? currentNumber : 'Done!'}
            </div>
          </div>
        )}

        {config.mode === 'read' && (
          <div className="mb-8 text-center">
            <p className="text-[#8a857e] text-sm font-medium uppercase tracking-widest mb-2">Read Mode</p>
            <div className="text-2xl font-bold text-[#3d3935]">
              Scan the numbers from 1 to {totalNumbers}
            </div>
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridCols} gap-3 sm:gap-4 w-full aspect-square max-w-[500px] bg-white p-4 sm:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f0ebe1]`}>
          {numbers.map((num, index) => (
            <motion.button
              key={num.value}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => handleNumberClick(num, index)}
              disabled={config.mode === 'read' || isTimeUp}
              className={`
                relative flex items-center justify-center rounded-2xl text-2xl sm:text-4xl font-bold font-mono transition-all bg-[#fdfbf7] border-2 border-[#f0ebe1]
                ${config.mode === 'game' && !isTimeUp ? 'hover:scale-105 active:scale-95 shadow-sm hover:shadow-md cursor-pointer' : 'cursor-default'}
              `}
              style={{
                color: num.color,
              }}
            >
              {num.value}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time's Up Animation */}
      <AnimatePresence>
        {isTimeUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center bg-[#fdfbf7]/80 backdrop-blur-sm z-50"
          >
            <div className="bg-white px-12 py-8 rounded-3xl shadow-2xl border border-[#f0ebe1] text-center transform -rotate-2">
              <h2 className="text-5xl font-black text-[#3d3935] tracking-tight mb-2">Time's Up!</h2>
              <p className="text-[#8a857e] font-medium">Let's see how you did.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
