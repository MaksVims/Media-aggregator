import React, { FC, useCallback } from 'react';
import { AlertType, IFavoriteMovie } from 'types';
import { errorsMessage, successMessage } from '@/const';
import { FirebaseCollectionService } from '@/api';
import { CollectionState } from '@/store';
import { useAlert } from '@/contexts/AlertContext';
import { FavoriteMovieListItem } from '@/components/profile';
import { BoxDisplayCenter } from '@/components/ui';

interface FavoriteMovieListProps {
  title: string,
  movies: IFavoriteMovie[],
  classNames?: string
}

const FavoriteMovieList: FC<FavoriteMovieListProps> = ({ title, movies, classNames }) => {
  const mapRecords = CollectionState.mapRecordsToCollection
  const { showAlert } = useAlert()

  const removeFavoriteMovie = useCallback(async (record: string) => {
    try {
      await FirebaseCollectionService.removeMovieToCollection(record)
      showAlert(successMessage.REMOVE_MOVIE_TO_COLLECTION, AlertType.ERROR)
    } catch {
      showAlert(errorsMessage.REMOVE_MOVIE_TO_COLLECTION, AlertType.ERROR)
    }
  }, [showAlert])

  return (
    <div className={`overflow-x-auto w-full h-full ${classNames}`}>
      {
        movies.length ? (
          <>
            <h2 className="text-center font-semibold text-xl text-lg mb-2">{title}</h2>
            <ul className=" space-y-3">
              {
                movies.map((movie) => (
                  <FavoriteMovieListItem
                    key={movie.nameRu}
                    movie={movie}
                    handle={() => removeFavoriteMovie(mapRecords[movie.movieId])}
                  />
                ))
              }
            </ul>
          </>
        ) : (
          <BoxDisplayCenter title="Фильмы осутствуют" />
        )
      }
    </div>
  );
};

export default FavoriteMovieList;
