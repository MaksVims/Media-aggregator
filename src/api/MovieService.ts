import { movieNormalize } from '@/factory/movieNormalize'
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
  IResponseMovieFacts,
  IReponseMovieAwards,
} from 'types'

export default class MovieService {
  static async getPremiers(): Promise<IResponseMoviesPremieres> {
    const date = new Date()
    const year = date.getFullYear()
    const month = getStringMonth(date.getMonth())
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month.toUpperCase()}`

    const res = await fetchMovies(url) as IResponseMoviesPremieres
    return {
      total: res.total,
      items: res.items.map(movie => movieNormalize(movie))
    }
  }

  // Массив фильмов по фильтрам
  static async getMoviesByFilters(filters: IFilterOptions): Promise<IResponseMoviesByFiltersOrTop> {
    const url = getUrlFiltersMovies(filters)
    const res = await fetchMovies(url) as IResponseMoviesByFiltersOrTop
    return {
      pagesCount: res.pagesCount,
      films: res.films.map(movie => movieNormalize(movie))
    }
  }

  // Получить данные фильма по id
  static async getMovieById(movieId: number): Promise<ISingleMovie> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`
    return await fetchMovies(url) as ISingleMovie
  }

  // Топ фильмов
  static async getTopMovies(page: number = 15): Promise<IResponseMoviesByFiltersOrTop> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`
    const res = await fetchMovies(url) as IResponseMoviesByFiltersOrTop
    return {
      pagesCount: res.pagesCount,
      films: res.films.map(movie => movieNormalize(movie))
    }
  }

  // Поиск фильма по ключевому слову
  static async getMoviesByKeyWord(keyword: string, page: number): Promise<IResponseSearchByKeyWord> {
    const encodeWord = encodeURIComponent(keyword)
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeWord}&page=${page}`
    const res = await fetchMovies(url) as IResponseSearchByKeyWord
    return {
      keyword: res.keyword,
      pagesCount: res.pagesCount,
      searchFilmsCountResult: res.searchFilmsCountResult,
      films: res.films.map(movie => movieNormalize(movie))
    }
  }

  // Данные о рецензиях на фильм
  static async getReviewsByMovie(movieId: number, page: number = 5): Promise<IResponseReviewsByMovie> {
    const url = `https://kinopoiskapiunofficial.tech/api/v1/reviews?filmId=${movieId}&page=${page}`
    return await fetchMovies(url) as IResponseReviewsByMovie
  }

  // Получение ссылок на внешние ресурсы для просмотра
  static async getExternalSource(movieId: number): Promise<IResponseExternalSource> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/external_sources`
    return await fetchMovies(url) as IResponseExternalSource
  }

  // Получить изображения связанные с фильмом
  static async getMovieImages(movieId: number): Promise<IResponseMovieImages> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/images`
    return await fetchMovies(url) as IResponseMovieImages
  }

  // Получить список фактов и ошибок в фильме
  static async getMovieFacts(movieId: number): Promise<IResponseMovieFacts> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/facts`
    return await fetchMovies(url) as IResponseMovieFacts
  }

  // Получить список наград и премий фильма
  static async getMovieAwards(movieId: number): Promise<IReponseMovieAwards> {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/awards`
    return await fetchMovies(url) as IReponseMovieAwards
  }

}
