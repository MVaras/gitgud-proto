import { z } from 'zod';

export const bookingSchema = z.object({
  court_id: z.string().uuid({ message: "Cancha inválida" }),
  start_time: z.string().min(1, { message: "Fecha/hora de inicio requerida" }),
  end_time: z.string().min(1, { message: "Fecha/hora de fin requerida" }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
