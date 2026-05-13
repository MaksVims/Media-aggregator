import React, {
  FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth } from 'service/firebase';
import { TOKEN } from '@/const';

interface IAuthContext {
  user: User | null,
  loadingUser: boolean
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `${TOKEN}=${user?.refreshToken};max-age=3600;path=/`
      } else {
        document.cookie = `${TOKEN}=${null};max-age=${-1};path=/`
      }

      setUser(user || null)
      setLoadingUser(false)
    })
  }, [])

  const credentials: IAuthContext = useMemo(() => ({ user, loadingUser }), [user, loadingUser])

  return (
    <AuthContext.Provider value={credentials}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)
