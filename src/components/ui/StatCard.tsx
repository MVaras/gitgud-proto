import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    type: 'up' | 'down' | 'neutral';
    value: string;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend }) => {
  const trendColor = {
    up: 'text-emerald-500',
    down: 'text-rose-500',
    neutral: 'text-slate-400'
  }[trend?.type || 'neutral'];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trendColor}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-tight">{label}</p>
      </div>
    </div>
  );
};
