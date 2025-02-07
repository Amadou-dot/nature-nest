import { supabase } from '../supabase';

/** Signs in and returns the passed in user*/
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data.user;
};

/** Returns the current logged in user */
export const getCurrentUser = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  if (!session.session) return null;
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);
  return user.user;
};

/** Logs out the user */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

/** Signs up a user with an email,and password */
export const signUpWithEmail = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });
  if (error) throw new Error(error.message);
  return data;
};

/** Updates the user's name and profile image if the file exists */
export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) => {
  const updateData = password ? { password } : { data: { fullName, avatar } };
  if (!avatar) delete updateData.data?.avatar;
  //? update password or name. Both can't be updated at the same time
  const { data, error: updateError } =
    await supabase.auth.updateUser(updateData);
  if (updateError) throw new Error(updateError.message);
  if (!avatar) return data.user;

  //? upload avatar image if it exists
  const fileName = `${data.user.id}/${avatar.name}`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar, { upsert: true });
  if (uploadError) throw new Error(uploadError.message);

  // update avatar in the user table
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${import.meta.env.VITE_AVATAR_BUCKET_URL_BASE}/${fileName}`,
      },
    });
  if (updateAvatarError) throw new Error(updateAvatarError.message);
  // return the updated user
  return updatedUser.user;
};
