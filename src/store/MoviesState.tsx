import { makeAutoObservable } from 'mobx';
import { IMovieForGrid, MovieDB, SortType } from 'types';
import { getCleanListMoviesForGrid } from 'helpers';
import { MovieForGrid } from '@/factory/MovieForGrid';
import CollectionState from '@/store/CollectionState';

class MoviesState {
  movies: IMovieForGrid[] = []
  filter: SortType = SortType.DEFAULT
  sortDirection: 'asc' | 'desc' = 'desc'
  viewMode: 'all' | 'favorite' = 'all'     

  constructor() {
    makeAutoObservable(this)
  }

  setMovies(movies: MovieDB[]) {
    const newMovies = movies.map((movie) => new MovieForGrid(movie))
    this.movies = [...this.movies, ...getCleanListMoviesForGrid(newMovies)]
  }

  setViewMode = (mode: 'all' | 'favorite') => {
    this.viewMode = mode
  }

  setFilter = (type: SortType) => {
    if (this.filter === type) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    } else {
      this.filter = type
      if (type === SortType.RATING || type === SortType.YEAR) {
        this.sortDirection = 'desc'
      } else if (type === SortType.NAME) {
        this.sortDirection = 'asc'
      }
    }
  }

  reset() {
    this.filter = SortType.DEFAULT
    this.sortDirection = 'desc'
    this.viewMode = 'all'
    this.movies = []
  }

  get filteredMovies(): MovieForGrid[] {
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
          const valA = Number(a.rating) || 0
          const valB = Number(b.rating) || 0
          return this.sortDirection === 'desc' ? valB - valA : valA - valB
        })
        break

      case SortType.YEAR:
        result.sort((a, b) => {
          const valA = Number(a.year) || 0
          const valB = Number(b.year) || 0
          return this.sortDirection === 'desc' ? valB - valA : valA - valB
        })
        break

      case SortType.NAME:
        result.sort((a, b) => {
          const comparison = a.nameRu.localeCompare(b.nameRu)
          return this.sortDirection === 'desc' ? -comparison : comparison
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