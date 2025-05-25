import { createContext } from 'react';

import type { User } from '@/app/common/models';

export interface UserContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  clear: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: {
    name: 'Henrique',
    email: 'henrique@gmail.com',
    roles: ['admin'],
    photoUrl: '',
  },
  setUser: (user: User | undefined) => {},
  clear: () => {},
});
