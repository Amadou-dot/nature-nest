import { Database } from '../../interfaces/database.types';
import { supabase } from '../../supabase';
type Settings = Database['public']['Tables']['settings']['Row'];

export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();
  if (error) throw new Error('Error fetching settings');
  return data as Settings;
};

export const updateSettings = async (settings: Partial<Settings>) => {
  const { error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)
    .select();
  if (error) throw new Error('Error updating settings');
  return true;
};
