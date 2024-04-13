import { ReactNode, createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  login: (email: string, userId: number) => {},
  logout: () => {},
  isUserLoggedIn: false,
  email: '',
  userId: 0,
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const emailFromLocalStore = localStorage.getItem('userEmail');
  const [email, setEmail] = useState(emailFromLocalStore || '');
  const idFromLocalStore = localStorage.getItem('userId');
  const [userId, setUserId] = useState<number>(
    idFromLocalStore ? +idFromLocalStore : 0
  );

  const isUserLoggedIn = Boolean(email);

  console.log('email Provide ctx ===', email);
  console.log('userId ===', userId);

  function login(email: string, id: number) {
    setEmail(email);
    setUserId(id);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', id.toString());
  }
  function logout() {
    setEmail('');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  }

  const value = {
    login,
    logout,
    isUserLoggedIn,
    email,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx() {
  return useContext(AuthContext);
}
