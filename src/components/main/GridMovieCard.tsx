import React, { FC } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Link from 'next/link'
import cn from 'classnames'
import { IFavoriteMovie, IMovie } from 'types';
import {
  Like, MovieCardLoader, Play, RatingMovie,
} from '@/components/ui';
import { CollectionState } from '@/store';
import { useMovieLike } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';

interface IGridMoveItem {
  movie: IMovie | IFavoriteMovie,
  onEdit?: () => void,
  isProfile?: boolean,
}

const GridMovieCard: FC<IGridMoveItem> = ({ movie, onEdit, isProfile }) => {
  const { user } = useAuth()
  const { movieId, nameRu, posterUrlPreview, rating, year } = movie

  const isView = 'isView' in movie ? (movie as IFavoriteMovie).isView : false

  const {
    removeMovieToCollection,
    addMovieToCollection,
    isActive,
  } = useMovieLike({ movieId, nameRu, posterUrlPreview: posterUrlPreview || '', rating: rating || 0, year, comment: '', isView: false })
  const { loading } = CollectionState

  if (loading) {
    return <MovieCardLoader />
  }

  return (
    <article
      className={`group cursor-pointer overflow-hidden${isProfile ? ' flex flex-col h-full' : ' transform transition-transform duration-200 sm:hover:scale-105'}`}
    >
      <Link href={`/movies/${movieId}`} prefetch={false}>
        <a>
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
            <Image
              src={movie.posterUrlPreview || '/images/no_image.png'}
              width={475}
              height={650}
              alt={movie.nameRu}
              objectFit='cover'
            />
            <div className={cn('absolute left-0 top-0 full bg-black', isView ? 'opacity-70' : 'opacity-0 group-hover:opacity-70')} />
            {!isView && <Play className="group-hover:opacity-100 opacity-0 flex-center" size={isProfile ? 36 : 70} />}
            {
              movie.year > 0 && !isNaN(Number(movie.year))
              && (
                <span className={isProfile ? 'bubble top-1 left-1 !text-xs !py-0.5 !px-1.5' : 'bubble top-2 left-2'}>
                  {movie.year}
                </span>
              )
            }
            {
              movie.rating > 0 && (
                <RatingMovie
                  rating={movie.rating || 0}
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
                size={isProfile ? 18 : 32}
                active={isActive}
              />
            )}
          </div>
        </a>
      </Link>
      <div className={cn('mt-2 md:mt-3 flex justify-between', isProfile ? 'text-black h-9 overflow-hidden' : 'text-white')}>
        <h2 className={cn('font-medium font-bold text-xs', isProfile ? 'line-clamp-2' : '')}>
          {isProfile ? movie.nameRu : (movie.nameRu.length > 35 ? movie.nameRu.slice(0, 35) + '...' : movie.nameRu)}
        </h2>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="w-full mt-3 py-1 px-2 text-xs font-semibold rounded-md bg-primary-light hover:bg-primary text-black hover:text-white transition duration-100 cursor-pointer shadow-sm"
        >
          Изменить
        </button>
      )}
    </article>
  );
};

export default observer(GridMovieCard);
