import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GameConfig, Mode, Difficulty, GridSize } from '../types';
import { Play, Eye, MousePointerClick, Info } from 'lucide-react';

interface StartScreenProps {
  key?: string;
  onStart: (config: GameConfig) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [mode, setMode] = useState<Mode>('read');
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [difficulty, setDifficulty] = useState<Difficulty>('one_tone');
  const [timeLimit, setTimeLimit] = useState<number>(30);

  const handleStart = () => {
    onStart({ mode, gridSize, difficulty, timeLimit });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdfbf7] text-[#3d3935] font-sans"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f0ebe1]">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-[#2a2724]">Gridzzly Numbers</h1>
        <p className="text-center text-[#8a857e] mb-8 text-sm">Find the numbers in order before time runs out.</p>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#a39e96]">Select Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('read')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  mode === 'read'
                    ? 'border-[#3d3935] bg-[#3d3935] text-white shadow-md'
                    : 'border-[#f0ebe1] bg-white text-[#8a857e] hover:border-[#d6d1c7]'
                }`}
              >
                <Eye className="w-6 h-6 mb-2" />
                <span className="font-medium text-sm">Read Mode</span>
              </button>
              <button
                onClick={() => setMode('game')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  mode === 'game'
                    ? 'border-[#3d3935] bg-[#3d3935] text-white shadow-md'
                    : 'border-[#f0ebe1] bg-white text-[#8a857e] hover:border-[#d6d1c7]'
                }`}
              >
                <MousePointerClick className="w-6 h-6 mb-2" />
                <span className="font-medium text-sm">Game Mode</span>
              </button>
            </div>
          </div>

          {/* Grid Size */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#a39e96]">Grid Size</label>
            <div className="flex bg-[#f5f3ef] p-1 rounded-xl">
              {[3, 4, 5].map((size) => (
                <button
                  key={size}
                  onClick={() => setGridSize(size as GridSize)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    gridSize === size
                      ? 'bg-white text-[#3d3935] shadow-sm'
                      : 'text-[#8a857e] hover:text-[#3d3935]'
                  }`}
                >
                  {size} x {size}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#a39e96]">Difficulty</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <button
                  onClick={() => setDifficulty('one_tone')}
                  className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium ${
                    difficulty === 'one_tone'
                      ? 'border-[#3d3935] bg-[#3d3935] text-white'
                      : 'border-[#f0ebe1] bg-white text-[#8a857e] hover:border-[#d6d1c7]'
                  }`}
                >
                  One Tone
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#2a2724] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-lg">
                  Easy: All numbers are displayed in a single color, making them easier to scan.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2a2724]"></div>
                </div>
              </div>
              <div className="relative group">
                <button
                  onClick={() => setDifficulty('colored')}
                  className={`w-full py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium ${
                    difficulty === 'colored'
                      ? 'border-[#3d3935] bg-[#3d3935] text-white'
                      : 'border-[#f0ebe1] bg-white text-[#8a857e] hover:border-[#d6d1c7]'
                  }`}
                >
                  Colored
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#2a2724] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-lg">
                  Difficult: Numbers are displayed in random colors, adding visual noise.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2a2724]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Limit */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#a39e96]">Time Limit (Seconds)</label>
              <span className="text-sm font-bold text-[#3d3935]">{timeLimit}s</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="w-full h-2 bg-[#f0ebe1] rounded-lg appearance-none cursor-pointer accent-[#3d3935]"
            />
            <div className="flex justify-between text-xs text-[#a39e96]">
              <span>10s</span>
              <span>120s</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 mt-4 bg-[#f08c35] hover:bg-[#e07b24] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#f08c35]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Gridzzly
          </button>
        </div>
      </div>
    </motion.div>
  );
}
