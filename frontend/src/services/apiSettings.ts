import { supabase } from '../supabase';
import { Setting } from '../types/database.types';

export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();
  if (error) throw new Error('Error fetching settings');
  return data as Setting;
};

export const updateSettings = async (settings: Partial<Setting>) => {
  const { error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)
    .select();
  if (error) throw new Error('Error updating settings');
  return true;
};
