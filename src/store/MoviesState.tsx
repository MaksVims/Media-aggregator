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
    this.movies = [...this.movies, ...getCleanListMoviesForGrid(movies)]
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
    this.viewMode = 'all'
    this.movies = []
  }

  get filteredMovies(): IMovie[] {
    let result = [...this.movies]

    // Сначала фильтруем по режиму просмотра
    if (this.viewMode === 'favorite') {
      const favorites = CollectionState.moviesToCollection
      result = result.filter(movie => 
        favorites.some(fav => fav.movieId === movie.movieId)
      )
    }

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