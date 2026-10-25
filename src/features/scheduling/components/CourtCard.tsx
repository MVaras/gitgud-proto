import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface CourtCardProps {
  court: any;
  onSelect: (court: any) => void;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court, onSelect }) => (
  <Card className="p-4 flex flex-col gap-3">
    <div>
      <h4 className="font-bold text-lg">{court.name}</h4>
      <p className="text-sm text-gray-500">{court.category} • {court.location}</p>
    </div>
    <div className="flex justify-between items-center mt-auto">
      <span className="font-bold text-blue-600">${court.price_per_hour}/h</span>
      <Button variant="secondary" className="text-sm" onClick={() => onSelect(court)}>
        Reservar
      </Button>
    </div>
  </Card>
);
