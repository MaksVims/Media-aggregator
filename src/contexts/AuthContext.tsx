import React, {
  FC, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth } from 'service/firebase';
import { TOKEN } from '@/const';
import { FirebaseAuthService } from '@/api';

interface IAuthContext {
  user: User | null,
  loadingUser: boolean,
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<User>
  updateName: (name: string) => Promise<void>
  deleteAccount: () => Promise<boolean>
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `${TOKEN}=${user?.refreshToken};max-age=3600;path=/;Secure;SameSite=Strict`
      } else {
        document.cookie = `${TOKEN}=;max-age=0;path=/;Secure;SameSite=Strict`
      }

      setUser(user || null)
      setLoadingUser(false)
    })
  }, [])

  const login = useCallback(
    (email: string, password: string) => FirebaseAuthService.login(email, password),
    []
  )

  const logout = useCallback(
    () => FirebaseAuthService.logout(),
    []
  )

  const register = useCallback(
    (email: string, password: string, name?: string) => FirebaseAuthService.register(email, password, name),
    []
  )

  const updateName = useCallback(
    (name: string) => FirebaseAuthService.updateProfile(name),
    []
  )

  const deleteAccount = useCallback(
    () => FirebaseAuthService.deleteAccount(),
    []
  )

  const credentials: IAuthContext = useMemo(
    () => ({ user, loadingUser, login, logout, register, updateName, deleteAccount }),
    [user, loadingUser, login, logout, register, updateName, deleteAccount]
  )

  return (
    <AuthContext.Provider value={credentials}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext)
