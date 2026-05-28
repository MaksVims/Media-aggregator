import { useCallback, useEffect, useState } from 'react';
import { isCollection } from 'helpers';
import { AlertType, IFavoriteMovie } from 'types';
import { CollectionState } from '@/store';
import { useAlert } from '@/contexts/AlertContext';
import successMessage from '@/const/successMessage';
import { CustomError } from '@/factory/CustomError';

export default function useMovieLike(newMovie: IFavoriteMovie) {
  const collection = CollectionState.moviesToCollection
  const mapRecords = CollectionState.mapRecordsToCollection
  const [isActive, setIsActive] = useState(false)
  const { showAlert } = useAlert()

  useEffect(() => {
    setIsActive(isCollection(newMovie.movieId, collection))
  }, [newMovie.movieId, collection])

  const addMovieToCollection = useCallback(async () => {
    try {
      await CollectionState.addMovieToCollection(newMovie)
      showAlert(successMessage.ADD_MOVIE_TO_COLLECTION, AlertType.SUCCESS)
    } catch (e) {
      if (e instanceof CustomError) {
        showAlert(e.message, AlertType.ERROR)
      }
    }
  }, [newMovie.movieId])

  const removeMovieToCollection = useCallback(async () => {
    try {
      await CollectionState.removeMovieToCollection(mapRecords[newMovie.movieId])
      showAlert(successMessage.REMOVE_MOVIE_TO_COLLECTION, AlertType.SUCCESS)
    } catch (e) {
      if (e instanceof CustomError) {
        showAlert(e.message, AlertType.ERROR)
      }
    }
  }, [newMovie.movieId, mapRecords])

  return { isActive, addMovieToCollection, removeMovieToCollection }
}
