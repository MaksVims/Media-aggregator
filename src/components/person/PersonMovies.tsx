import React, { FC } from 'react';
import Link from 'next/link';
import { BarSortFiltersPerson } from '@/components/person';
import { BoxDisplayCenter } from '@/components/ui';
import { IMovie } from 'types';

interface PersonMoviesProps {
  filteredMovies: IMovie[]
}

const PersonMovies: FC<PersonMoviesProps> = ({ filteredMovies }) => (
  <section className="space-y-6 pb-6">
    <h2 className="text-center text-2xl font-medium">
      Список фильмов
    </h2>
    <BarSortFiltersPerson />
    <div className="w-full">
      <ul className="space-y-2 relative max-h-[500px] max-w-xl pt-2 overflow-y-auto mx-auto custom-scrollbar pb-4">
        {filteredMovies.length
          ? filteredMovies.map((movie, idx) => (
            <li key={movie.movieId}>
              <Link passHref href={`/movies/${movie.movieId}`} prefetch={false}>
                <a className="cursor-pointer hover:underline hover:text-grey-color">
                  {idx + 1}. {movie.nameRu}
                </a>
              </Link>
            </li>
          )) : (
            <BoxDisplayCenter title="Фильмов нет" />
          )}
      </ul>
    </div>
  </section>
);

export default PersonMovies;
