import { Database } from '../../interfaces/database.types';
import { supabase } from '../../supabase';
type Cabin = Database['public']['Tables']['cabins']['Row'];

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) throw error;
  return cabins as Cabin[];
}
