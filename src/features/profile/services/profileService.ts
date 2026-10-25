import { supabase } from '../../lib/supabase';
import { ProfileFormValues } from '../schemas/profileSchema';

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, values: ProfileFormValues) {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...values, updated_at: new Date().toISOString() });
    if (error) throw error;
  }
};
