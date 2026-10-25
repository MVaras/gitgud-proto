import { supabase } from '../../lib/supabase';
import { AchievementFormValues } from '../schemas/achievementSchema';

export const progressionService = {
  async getAchievements(userId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addAchievement(values: AchievementFormValues, userId: string) {
    const { error } = await supabase
      .from('achievements')
      .insert([{ ...values, user_id: userId }]);
    if (error) throw error;
  },

  async deleteAchievement(id: string) {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
