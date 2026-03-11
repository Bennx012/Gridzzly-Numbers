import React from 'react';
import { motion } from 'motion/react';
import { GameStat } from '../types';
import { RotateCcw, Home, Trophy, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface GameEndScreenProps {
  key?: string;
  stats: GameStat[];
  completed: boolean;
  totalNumbers: number;
  timeLimit: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function GameEndScreen({
  stats,
  completed,
  totalNumbers,
  timeLimit,
  onRestart,
  onHome,
}: GameEndScreenProps) {
  const sumTime = stats.reduce((acc, curr) => acc + curr.timeTaken, 0);
  const totalTime = completed ? sumTime : timeLimit;
  const avgTime = stats.length > 0 ? (totalTime / stats.length).toFixed(2) : '0.00';
  const score = completed ? Math.max(0, Math.round((timeLimit - totalTime) * 100)) : 0;

  const chartData = stats.map((stat) => ({
    name: `Num ${stat.number}`,
    time: parseFloat(stat.timeTaken.toFixed(2)),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-6 font-sans"
    >
      <div className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-[#f0ebe1]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f5f3ef] mb-6 shadow-inner border border-[#e8e4d9]">
            {completed ? (
              <Trophy className="w-10 h-10 text-[#f08c35]" />
            ) : (
              <Clock className="w-10 h-10 text-[#8a857e]" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-[#3d3935] tracking-tight mb-3">
            {completed ? 'Grid Completed!' : 'Time is up!'}
          </h1>
          <p className="text-[#8a857e] text-lg">
            You found <span className="font-bold text-[#3d3935]">{stats.length}</span> out of{' '}
            <span className="font-bold text-[#3d3935]">{totalNumbers}</span> numbers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-[#f0ebe1] text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a39e96] mb-2">Total Time</p>
            <p className="text-3xl font-mono font-bold text-[#3d3935]">{totalTime.toFixed(1)}s</p>
          </div>
          <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-[#f0ebe1] text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a39e96] mb-2">Avg Time / Num</p>
            <p className="text-3xl font-mono font-bold text-[#3d3935]">{avgTime}s</p>
          </div>
        </div>

        {/* Chart */}
        {stats.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a39e96] mb-6 text-center">
              Time Taken Per Number
            </h3>
            <div className="h-64 w-full bg-[#fdfbf7] p-4 rounded-3xl border border-[#f0ebe1]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe1" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#a39e96' }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#a39e96' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}s`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#3d3935',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${value}s`, 'Time']}
                    labelStyle={{ color: '#a39e96', marginBottom: '4px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#21b4d9"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#21b4d9', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#f08c35', strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onRestart}
            className="py-4 bg-[#3d3935] hover:bg-[#2a2724] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#3d3935]/20 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={onHome}
            className="py-4 bg-white hover:bg-[#fdfbf7] text-[#8a857e] hover:text-[#3d3935] rounded-2xl font-bold text-sm border-2 border-[#f0ebe1] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Main Menu
          </button>
        </div>
      </div>
    </motion.div>
  );
}
