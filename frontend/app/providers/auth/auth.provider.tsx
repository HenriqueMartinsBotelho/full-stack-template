import React, { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '@/app/providers';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('userToken')
  );

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  const signIn = (token: string) => {
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
