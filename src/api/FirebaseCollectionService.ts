import { auth, db } from 'service/firebase'
import {
  onValue, push, ref, remove, set,
} from 'firebase/database'
import { IFavoriteMovie, TypeCollection } from 'types';

type updateResolverType = (update: TypeCollection) => Promise<void>

export default class FirebaseCollectionService {
  static loadCollection(
    userId: string,
    updateResolver: updateResolverType,
  ): Promise<TypeCollection> {
    const collectionListRef = ref(db, `/users/${userId}/collection`)

    return new Promise((resolve, reject) => {
      let isFirst = true
      onValue(
        collectionListRef,
        (snapshot) => {
          const data = snapshot.val()
          if (isFirst) {
            isFirst = false
            resolve(data)
          }
          updateResolver(data)
        },
        (error) => {
          if (isFirst) reject(error)
        }
      )
    })
  }

  static async removeMovieToCollection(recordId: string) {
    const userId = auth.currentUser?.uid
    const collectionListItemRef = ref(db, `/users/${userId}/collection/${recordId}`)
    return remove(collectionListItemRef)
  }

  static async addMovieToCollection(newMovie: IFavoriteMovie) {
    const userId = auth.currentUser?.uid
    const collectionListRef = ref(db, `/users/${userId}/collection`)
    const newCollectionItemRef = push(collectionListRef)
    await set(newCollectionItemRef, {
      ...newMovie
    })
    return true
  }

  static async updateMovieInCollection(recordId: string, updatedMovie: IFavoriteMovie) {
    const userId = auth.currentUser?.uid
    const collectionListItemRef = ref(db, `/users/${userId}/collection/${recordId}`)
    return set(collectionListItemRef, { ...updatedMovie })
  }
}
