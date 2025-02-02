interface user_metadata {
  email: string;
  email_verified: boolean;
  fullName: string;
  avatar: string;
  phone_verified: boolean;
  sub: string;
}

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: user_metadata;
  identities: [
    {
      identity_id: string;
      id: string;
      user_id: string;
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
      email: string;
      identity_data: user_metadata[];
    },
  ];
};
