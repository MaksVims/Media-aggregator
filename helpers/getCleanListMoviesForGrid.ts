import {IMovie } from 'types'

export default function getCleanListMoviesForGrid(movies: IMovie[]) {
  return movies.filter((movie) => movie.nameRu && movie.posterUrlPreview)
}
