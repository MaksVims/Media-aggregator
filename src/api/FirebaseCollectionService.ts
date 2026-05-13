import { auth, db } from 'service/firebase'
import {
  DatabaseReference, get, onValue, push, ref, remove, set,
} from 'firebase/database'
import { IMovieForDB, TypeCollection } from 'types';

type updateResolverType = (update: TypeCollection) => Promise<void>

export default class FirebaseCollectionService {
  static async loadCollection(
    userId: string,
    updateResolver: updateResolverType,
  ) {
    const collectionListRef = ref(db, `/users/${userId}/collection`)
    await FirebaseCollectionService.createObserverUpdate(collectionListRef, updateResolver)
    return get(collectionListRef).then((snapshot) => snapshot.val())
  }

  static async createObserverUpdate(
    observeRef: DatabaseReference,
    updateResolver: updateResolverType,
  ) {
    onValue(observeRef, (snapshot) => {
      const data = snapshot.val()
      updateResolver(data)
    })
  }

  static async removeMovieToCollection(recordId: string) {
    const userId = auth.currentUser?.uid
    const collectionListItemRef = ref(db, `/users/${userId}/collection/${recordId}`)
    return remove(collectionListItemRef)
  }

  static async addMovieToCollection(newMovie: IMovieForDB) {
    const userId = auth.currentUser?.uid
    const collectionListRef = ref(db, `/users/${userId}/collection`)
    const newCollectionItemRef = push(collectionListRef)
    await set(newCollectionItemRef, {
      ...newMovie
    })
    return true
  }
}
