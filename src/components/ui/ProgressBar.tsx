import React from 'react';

interface ProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentXP, nextLevelXP, label }) => {
  const progress = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>}
      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{currentXP} XP</span>
        <span>{nextLevelXP} XP</span>
      </div>
    </div>
  );
};
