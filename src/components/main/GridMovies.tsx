import React, { FC } from 'react';
import { IMovieForGrid } from 'types';
import { GridMovieCard } from '@/components/main';

interface IGridMovies {
  movies: IMovieForGrid[]
}

const GridMovies: FC<IGridMovies> = ({ movies }) => (
  <section
    className="grid my-8 px-4 gap-y-8 gap-x-4 
    grid-cols-2           
    xs:grid-cols-3 
    sm:grid-cols-4 
    md:grid-cols-5 
    lg:grid-cols-6 
    xl:grid-cols-8 
    2xl:grid-cols-10      
    xl:px-6 items-start"
  >
    {movies.map((movie) => (
      <GridMovieCard
        key={movie.movieId}
        movie={movie}
      />
    ))}
  </section>
);

export default GridMovies;
