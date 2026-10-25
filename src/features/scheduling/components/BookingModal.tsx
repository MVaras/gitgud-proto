import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { BookingFormValues } from '../schemas/bookingSchema';

interface BookingModalProps {
  court: any;
  onClose: () => void;
  onSubmit: (values: BookingFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({ court, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BookingFormValues>({
    court_id: court.id,
    start_time: '',
    end_time: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">Reservar {court.name}</h3>
        <div className="space-y-4">
          <Input 
            label="Inicio" 
            type="datetime-local" 
            onChange={e => setFormData({...formData, start_time: e.target.value})}
          />
          <Input 
            label="Fin" 
            type="datetime-local" 
            onChange={e => setFormData({...formData, end_time: e.target.value})}
          />
          <div className="flex gap-2 mt-6">
            <Button variant="secondary" className="flex-1" onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
            <Button className="flex-1" onClick={() => onSubmit(formData)} isLoading={isSubmitting}>Confirmar</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
