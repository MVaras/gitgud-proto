import React, { useState } from 'react';
import { useCourts, useBookings } from '../hooks/useHooks';
import { CourtCard } from './CourtCard';
import { BookingModal } from './BookingModal';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../features/auth/hooks/useAuth';

export const SchedulingView: React.FC<{ userId?: string }> = ({ userId }) => {
  const { session } = useAuth();
  const effectiveUserId = userId || session?.user.id;
  const { data: courts = [], isLoading: isCourtsLoading } = useCourts();
  const { bookings, isLoading: isBookingsLoading, createBooking, isCreating } = useBookings(effectiveUserId);
  
  const [selectedCourt, setSelectedCourt] = useState<any>(null);

  if (!effectiveUserId) return null;

  return (
    <div className="space-y-12">
      {/* Sección de Canchas */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Reserva una cancha</h3>
        {isCourtsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courts.map(court => (
              <CourtCard key={court.id} court={court} onSelect={setSelectedCourt} />
            ))}
          </div>
        )}
      </section>

      {/* Sección de Mis Reservas */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Mis Reservas</h3>
        {isBookingsLoading ? (
          <div className="text-gray-500">Cargando tus reservas...</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500 italic">No tienes reservas activas.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b: any) => (
              <Card key={b.id} className="p-4 border-l-4 border-blue-500">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">{b.courts?.name}</h4>
                    <p className="text-sm text-gray-600">{new Date(b.start_time).toLocaleString()}</p>
                  </div>
                  <span className="text-xs font-bold uppercase text-blue-600">{b.status}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Reserva */}
      {selectedCourt && (
        <BookingModal 
          court={selectedCourt} 
          onClose={() => setSelectedCourt(null)} 
          onSubmit={(vals) => createBooking({ values: vals, userId: effectiveUserId! })}
          isSubmitting={isCreating}
        />
      )}
    </div>
  );
};
