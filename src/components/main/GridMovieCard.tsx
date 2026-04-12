import React, { FC } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Link from 'next/link'
import cn from 'classnames'
import { IMovieForGrid } from 'types';
import {
  Like, MovieCardLoader, Play, RatingMovie,
} from '@/components/ui';
import { CollectionState } from '@/store';
import { useMovieLike } from '@/hooks'; 
import { useAuth } from '@/contexts/AuthContext';

interface IGridMoveItem {
  movie: IMovieForGrid
}

const GridMovieCard: FC<IGridMoveItem> = ({ movie }) => {
  const { user } = useAuth()
  const { movieId } = movie
  const {
    removeMovieToCollection,
    addMovieToCollection,
    isActive,
  } = useMovieLike(movieId, movie.nameRu)
  const { loading } = CollectionState

  if (loading) {
    return <MovieCardLoader />
  }

  return (
    <article
      className="group cursor-pointer transform transition-transform duration-200 sm:hover:scale-105 "
    >
      <Link href={`/movies/${movieId}`}>
        <a>
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md ">
            <Image
              src={movie.posterUrlPreview || '/images/no_image.png'}
              width={475}
              height={650}
              alt={movie.nameRu}
              objectFit='cover'
            />
            <div className="absolute left-0 top-0 full bg-black group-hover:opacity-70 opacity-0" />
            <Play className="group-hover:opacity-100 opacity-0 flex-center" />
            {
              movie.year
              && (
              <span className="bubble top-2 left-2">
                {movie.year}
              </span>
              )
            }
            {
              movie.rating && (
              <RatingMovie
                rating={movie.rating || ''}
                size={20}
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-xl"
              />
              )
            }
            {user && (
            <Like
              onClick={isActive ? removeMovieToCollection : addMovieToCollection}
              className={cn('hover:scale-110 opacity-0 group-hover:opacity-100 absolute right-2 top-2', {
                'opacity-100': isActive,
              })}
              size={32}
              active={isActive}
            />
            )}
          </div>
        </a>
      </Link>
      <div className="mt-2 text-white md:mt-3 flex justify-between">
        <h2 className="font-medium font-bold">
          {movie.nameRu}
        </h2>
      </div>
    </article>
  );
};

export default observer(GridMovieCard);
