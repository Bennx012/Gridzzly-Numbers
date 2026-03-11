import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ReadEndScreen from './components/ReadEndScreen';
import GameEndScreen from './components/GameEndScreen';
import { GameConfig, GameStat } from './types';

type Screen = 'start' | 'game' | 'read_end' | 'game_end';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [stats, setStats] = useState<GameStat[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleStart = (newConfig: GameConfig) => {
    setConfig(newConfig);
    setCurrentScreen('game');
  };

  const handleGameEnd = (gameStats: GameStat[], isCompleted: boolean) => {
    setStats(gameStats);
    setCompleted(isCompleted);
    if (config?.mode === 'read') {
      setCurrentScreen('read_end');
    } else {
      setCurrentScreen('game_end');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('game');
  };

  const handleHome = () => {
    setCurrentScreen('start');
    setConfig(null);
    setStats([]);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#3d3935] font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}
        {currentScreen === 'game' && config && (
          <GameScreen
            key="game"
            config={config}
            onEnd={handleGameEnd}
            onBack={handleHome}
          />
        )}
        {currentScreen === 'read_end' && (
          <ReadEndScreen
            key="read_end"
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
        {currentScreen === 'game_end' && config && (
          <GameEndScreen
            key="game_end"
            stats={stats}
            completed={completed}
            totalNumbers={config.gridSize * config.gridSize}
            timeLimit={config.timeLimit}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
