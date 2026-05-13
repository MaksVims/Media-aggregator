import React, { FC } from 'react';
import { IFavoriteMovie, IMovie } from 'types';
import { GridMovieCard } from '@/components/main';

interface IGridMovies {
  movies: IMovie[] | IFavoriteMovie[],
  onEdit?: (movie: IFavoriteMovie) => void,
  isProfile?: boolean,
  className?: string,
}

const GridMovies: FC<IGridMovies> = ({ movies, onEdit, isProfile, className }) => (
  <section
    className={
      isProfile
        ? `grid gap-y-4 gap-x-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 ${className ?? ''}`
        : `grid my-9 px-4 gap-y-8 gap-x-4 grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 xl:px-6 items-start ${className ?? ''}`
    }
  >
    {movies.map((movie) => (
      <GridMovieCard
        key={movie.movieId}
        movie={movie}
        isProfile={isProfile}
        onEdit={onEdit ? () => onEdit(movie as IFavoriteMovie) : undefined}
      />
    ))}
  </section>
);

export default GridMovies;
