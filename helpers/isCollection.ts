import { IMovie } from 'types';

export default function isCollection(
  movieId: number,
  collection: IMovie[],
) {
  return !!collection.find((item) => item.movieId === movieId)
}
