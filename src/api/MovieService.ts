import { fetchMoviesOrStaff as fetchMovies, getStringMonth, getUrlFiltersMovies } from 'helpers'
import {
  IFilterOptions,
  IResponseMoviesByFiltersOrTop,
  IResponseMoviesPremieres,
  IResponseReviewsByMovie,
  IResponseSearchByKeyWord,
  IResponseExternalSource,
  ISingleMovie,
  IResponseMovieImages,
} from 'types'

export default class MovieService {
  static async getPremiers() {
    const date = new Date()
    const year = date.getFullYear()
    const month = getStringMonth(date.getMonth())
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month.toUpperCase()}`

    return await fetchMovies(url) as IResponseMoviesPremieres
  }

  // Массив фильмов по фильтрам
  static async getMoviesByFilters(filters: IFilterOptions) {
    const url = getUrlFiltersMovies(filters)
    return await fetchMovies(url) as IResponseMoviesByFiltersOrTop
  }

  // Получить данные фильма по id
  static async getMovieById(movieId: number) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`
    return await fetchMovies(url) as ISingleMovie
  }

  // Топ фильмов
  static async getTopMovies(page: number = 15) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`
    return await fetchMovies(url) as IResponseMoviesByFiltersOrTop
  }

  // Поиск фильма по ключевому слову
  static async getMoviesByKeyWord(keyword: string, page: number) {
    const encodeWord = encodeURIComponent(keyword)
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeWord}&page=${page}`
    return await fetchMovies(url) as IResponseSearchByKeyWord
  }

  // Данные о рецензиях на фильм
  static async getReviewsByMovie(movieId: number, page: number = 1) {
    const url = `https://kinopoiskapiunofficial.tech/api/v1/reviews?filmId=${movieId}&page=${page}`
    return await fetchMovies(url) as IResponseReviewsByMovie
  }

  // Получение ссылок на внешние ресурсы для просмотра
  static async getExternalSource(movieId: number) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/external_sources`
    return await fetchMovies(url) as IResponseExternalSource
  }

  // Получить изображения связанные с фильмом
  static async getMovieImages(movieId: number) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/images`
    return await fetchMovies(url) as IResponseMovieImages
  }
}
