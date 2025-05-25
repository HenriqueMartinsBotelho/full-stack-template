import { useContext } from 'react';

import { UserContext } from '@/app/providers/user';

export const useUser = () => {
  return useContext(UserContext);
};
