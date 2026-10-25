import { supabase } from '../../../lib/supabase';
import { LoginFormValues, SignUpFormValues } from '../schemas/authSchema';

export const authService = {
  async login(values: LoginFormValues) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) throw error;
    return data;
  },

  async signUp(values: SignUpFormValues) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
};
