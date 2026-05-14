import { makeAutoObservable } from 'mobx';
import { IMovie, SortType } from 'types';
import { getCleanListMoviesForGrid } from 'helpers';
import CollectionState from '@/store/CollectionState';

class MoviesState {
  movies: IMovie[] = []
  filter: SortType = SortType.DEFAULT
  sortDirection: 'asc' | 'desc' = 'desc'
  viewMode: 'all' | 'favorite' = 'all'

  constructor() {
    makeAutoObservable(this)
  }

  setMovies(movies: IMovie[]) {
    const existingId = new Set(this.movies.map(movie => movie.movieId))
    const clean = getCleanListMoviesForGrid(movies).filter(movie => !existingId.has(movie.movieId))
    this.movies = [...this.movies, ...clean]
  }

  setViewMode = (mode: 'all' | 'favorite') => {
    this.viewMode = mode
  }

  setFilter = (type: SortType) => {
    if (this.filter === type) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    } else {
      this.filter = type
      this.sortDirection = 'desc'
    }
  }

  reset() {
    this.filter = SortType.DEFAULT
    this.sortDirection = 'desc'
    this.movies = []
  }

  get filteredMovies(): IMovie[] {
    let result = this.viewMode === 'favorite'
      ? [...CollectionState.moviesToCollection] as unknown as IMovie[]
      : [...this.movies]

    // Затем применяем сортировку
    switch (this.filter) {
      case SortType.RATING:
        result.sort((a, b) => {
          const valA = a.rating || 0
          const valB = b.rating || 0
          return this.sortDirection === 'desc' ? valB - valA : valA - valB
        })
        break

      case SortType.YEAR:
        result.sort((a, b) => {
          const valA = a.year || 0
          const valB = b.year || 0
          return this.sortDirection === 'desc' ? valB - valA : valA - valB
        })
        break

      case SortType.NAME:
        result.sort((a, b) => {
          const comparison = a.nameRu.localeCompare(b.nameRu)
          return this.sortDirection === 'desc' ? comparison : -comparison
        })
        break

      case SortType.DEFAULT:
      default:
        break
    }

    return result
  }
}

export default new MoviesState()