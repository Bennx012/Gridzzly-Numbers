import React from 'react';
import { motion } from 'motion/react';
import { Coffee, RotateCcw, Home } from 'lucide-react';

interface ReadEndScreenProps {
  key?: string;
  onRestart: () => void;
  onHome: () => void;
}

export default function ReadEndScreen({ onRestart, onHome }: ReadEndScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f5f3ef] flex flex-col items-center justify-center p-6 font-serif relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#e8e4d9] blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#e8e4d9] blur-3xl"></div>
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white/50 text-center relative z-10">
        <div className="w-20 h-20 mx-auto bg-[#fdfbf7] rounded-full flex items-center justify-center shadow-inner border border-[#f0ebe1] mb-8">
          <Coffee className="w-10 h-10 text-[#8a857e]" />
        </div>
        
        <h1 className="text-4xl font-medium text-[#3d3935] mb-4 tracking-tight leading-tight">
          How did it go today?
        </h1>
        
        <p className="text-[#8a857e] font-sans text-sm mb-10 leading-relaxed max-w-[250px] mx-auto">
          Take a moment to reflect on your focus. Did you find all the numbers?
        </p>

        <div className="space-y-4 font-sans">
          <button
            onClick={onRestart}
            className="w-full py-4 bg-[#3d3935] hover:bg-[#2a2724] text-white rounded-2xl font-medium text-sm shadow-lg shadow-[#3d3935]/20 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            onClick={onHome}
            className="w-full py-4 bg-transparent hover:bg-[#fdfbf7] text-[#8a857e] hover:text-[#3d3935] rounded-2xl font-medium text-sm border border-[#f0ebe1] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Menu
          </button>
        </div>
      </div>
    </motion.div>
  );
}
