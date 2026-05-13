import React, { FC, useCallback, useMemo, useState } from 'react';
import { IFavoriteMovie } from 'types';
import { CollectionState } from '@/store';
import { BoxDisplayCenter } from '@/components/ui';
import { GridMovies } from '@/components/main';
import PopupEditFavoriteMovie from '@/components/profile/PopupEditFavoriteMovie';

interface FavoriteMovieListProps {
  title: string,
  movies: IFavoriteMovie[],
  classNames?: string
}

const FavoriteMovieList: FC<FavoriteMovieListProps> = ({ title, movies, classNames }) => {
  const mapRecords = CollectionState.mapRecordsToCollection
  const [editingMovie, setEditingMovie] = useState<IFavoriteMovie | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => movies.filter((m) => m.nameRu.toLowerCase().includes(query.toLowerCase())),
    [movies, query],
  )

  const handleEdit = useCallback((movie: IFavoriteMovie) => {
    setEditingMovie(movie)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setEditingMovie(null)
  }, [])

  return (
    <div className={`w-full h-full ${classNames}`}>
      <h2 className="text-center font-semibold text-xl mb-3">{title}</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по названию..."
        className="input w-full mb-5 text-sm"
      />
      {filtered.length ? (
        <GridMovies movies={filtered} onEdit={handleEdit} isProfile className="pb-4" />
      ) : (
        <BoxDisplayCenter title={movies.length ? 'Ничего не найдено' : 'Фильмы отсутствуют'} />
      )}
      {editingMovie && (
        <PopupEditFavoriteMovie
          key={editingMovie.movieId}
          movie={editingMovie}
          recordId={mapRecords[editingMovie.movieId]}
          isOpened
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default FavoriteMovieList;
