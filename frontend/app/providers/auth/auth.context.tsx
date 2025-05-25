import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);
