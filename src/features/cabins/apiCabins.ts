import { Database } from '../../interfaces/database.types';
import { supabase } from '../../supabase';

type Cabin = Database['public']['Tables']['cabins']['Row'];
type CabinForm = Database['public']['Tables']['cabins']['Form'];
type UpdateCabin = Partial<CabinForm> | { image?: string };
const cabinBucketBaseUrl = import.meta.env.VITE_CABIN_BUCKET_URL_BASE as string;

const handleImageUpload = async (image: File) => {
  const imgName = `cabin-${Date.now()}`;
  const { data, error } = await supabase.storage
    .from('cabin-images')
    .upload(imgName, image);

  if (error) throw new Error('Error uploading image');
  return data;
};

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) throw error;
  return cabins as Cabin[];
}

export async function getCabinById(id: number): Promise<Cabin> {
  const { data: cabin, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Error fetching cabin');
  return cabin as Cabin;
}

export async function createCabin(cabin: CabinForm) {
  if (!cabin.image) throw new Error('Image is required');

  const imgPath = await handleImageUpload(cabin.image);
  const fullImgPath = `${cabinBucketBaseUrl}/${imgPath.path}`;
  const { error } = await supabase
    .from('cabins')
    .insert({ ...cabin, image: fullImgPath })
    .select();
  
  if (error) throw new Error('Error creating cabin');
  return true;
}

export async function updateCabin(id: number, cabin: UpdateCabin) {
  let dataToUpdate = { ...cabin };

  if (cabin.image) {
    const imgPath = await handleImageUpload(cabin.image as File);
    const fullImgPath = `${cabinBucketBaseUrl}/${imgPath.path}`;
    dataToUpdate = { ...dataToUpdate, image: fullImgPath };
  } else {
    // Remove image field if no new image is provided
    delete dataToUpdate.image;
  }

  const { error } = await supabase
    .from('cabins')
    .update(dataToUpdate)
    .eq('id', id)
    .select();

  if (error) throw new Error('Error updating cabin');
  return true;
}

export async function deleteCabin(id: number) {
  // Delete image from storage
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) throw new Error('Error deleting cabin');
  return true;
}
