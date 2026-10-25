import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Zap, Target, Star, Trophy } from 'lucide-react';

interface AchievementItemProps {
  achievement: any;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, onDelete, isDeleting }) => {
  const icons: Record<string, React.ReactNode> = {
    match: <Zap size={16} className="text-yellow-500" />,
    training: <Target size={16} className="text-blue-500" />,
    milestone: <Star size={16} className="text-purple-500" />,
    stats: <Trophy size={16} className="text-orange-500" />,
  };

  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icons[achievement.category] || <Zap size={16} />}</div>
        <div>
          <h4 className="font-bold text-gray-800">{achievement.title}</h4>
          <p className="text-sm text-gray-500">{achievement.value}</p>
        </div>
      </div>
      <Button variant="ghost" className="text-red-400" onClick={() => onDelete(achievement.id)} isLoading={isDeleting}>
        ✕
      </Button>
    </Card>
  );
};
