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
  console.log(user);
  return user.user;
};

/** Logs out the user */
export const logout =  async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}