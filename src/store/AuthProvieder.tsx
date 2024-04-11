import { ReactNode, createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  login: (email: string, userId: number) => {},
  logout: () => {},
  isUserLoggedIn: false,
  email: '',
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState('');
  const isUserLoggedIn = Boolean(email);
  console.log('email Provide ctx ===', email);
  function login(email: string) {
    setEmail(email);
  }
  function logout() {
    setEmail('');
  }

  const value = {
    login,
    logout,
    isUserLoggedIn,
    email,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx() {
  return useContext(AuthContext);
}
