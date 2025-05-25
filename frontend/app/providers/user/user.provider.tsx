import React, { type ReactNode, useState } from 'react';

import type { User } from '@/app/common/models';
import { UserContext } from '@/app/providers/user/user.context';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  const updateUser = (user: User | undefined) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        clear: () => {},
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
