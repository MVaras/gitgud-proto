import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { schedulingService } from '../services/schedulingService';
import { BookingFormValues } from '../schemas/bookingSchema';
import { toast } from 'react-hot-toast';

export function useCourts() {
  return useQuery({
    queryKey: ['courts'],
    queryFn: schedulingService.getCourts,
  });
}

export function useBookings(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => schedulingService.getMyBookings(userId!),
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: ({ values, userId }: { values: BookingFormValues; userId: string }) => 
      schedulingService.createBooking(values, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', userId] });
      toast.success('¡Reserva confirmada!');
    },
  });

  return { bookings, isLoading, createBooking: createMutation.mutateAsync, isCreating: createMutation.isPending };
}
