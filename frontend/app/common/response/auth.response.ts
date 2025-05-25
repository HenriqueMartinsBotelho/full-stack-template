export type SingInResponse = {
  sign_in_response?: {
    token: string;
    refresh_token?: string;
    profile: 'Admin' | 'User';
  };
};
