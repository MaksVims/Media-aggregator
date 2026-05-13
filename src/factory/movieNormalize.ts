import { IMovie, IResponseMovie } from 'types';

export const movieNormalize = (movie: IResponseMovie): IMovie => {

  return {
    movieId:Number(movie.filmId ?? movie.kinopoiskId ?? 0),
    nameRu: movie.nameRu,
    posterUrlPreview: movie.posterUrlPreview || '',
    rating: Number(movie.rating) || 0,
    year: Number(movie.year) || 0
  }
}