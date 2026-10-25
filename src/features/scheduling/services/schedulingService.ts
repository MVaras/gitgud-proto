import { supabase } from '../../../lib/supabase';
import { Court } from '../../../types';
import { BookingFormValues } from '../schemas/bookingSchema';

export const schedulingService = {
  async getCourts(): Promise<Court[]> {
    const { data, error } = await supabase.from('courts').select('*');
    if (error) throw error;
    return data;
  },

  async createBooking(values: BookingFormValues, userId: string) {
    const { error } = await supabase.from('bookings').insert([{
      ...values,
      user_id: userId
    }]);
    if (error) throw error;
  },

  async getMyBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, courts(name, category)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
};
