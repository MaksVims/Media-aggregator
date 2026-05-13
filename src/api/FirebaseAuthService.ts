import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'service/firebase';
import { deleteUser } from '@firebase/auth';

export default class FirebaseAuthService {
  static async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  }

  static async logout() {
    return auth.signOut()
  }

  static async register(
    email: string,
    password: string,
    name?: string,
  ) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser!, {
      displayName: name || email,
    })
    return credential.user
  }

  static async updateProfile(
    name: string,
  ) {
    await updateProfile(auth.currentUser!, {
      displayName: name
    })
  }

  static async deleteAccount() {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser)
      return true
    }
    return false
  }
}
