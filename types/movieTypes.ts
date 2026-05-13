// полученный фильм в ответе
export interface IResponseMovie {
  filmId?:number,
  kinopoiskId?: number,
  nameRu: string,
  year: number,
  rating: number,
  posterUrlPreview: string,
}

// фильм для сетки и внутренней работы
export interface IMovie {
  movieId: number,
  nameRu: string,
  year: number,
  rating: number,
  posterUrlPreview: string,
}

// фильм для базы данных коллекций пользователя
export interface IFavoriteMovie {
  movieId: number,
  nameRu: string,
  year: number,
  rating: number,
  posterUrlPreview: string,
  isView: boolean,
  comment: string
}

// подробные данные о конкретном фильме
export interface ISingleMovie {
  nameRu: string,
  nameOriginal: string,
  kinopoiskId: number
  posterUrl: string,
  reviewsCount: number,
  ratingGoodReview: number,
  ratingKinopoisk: number,
  ratingKinopoiskVoteCount: number,
  ratingImdb: number,
  ratingImdbVoteCount: number,
  webUrl: string,
  year: number,
  filmLength: number,
  description: string,
  shortDescription: string,
  slogan: string,
  countries: [{ country: string }],
  genres: [{ genre: string }],
}

export interface IPersonMovie {
  filmId: number,
  nameRu: string,
}

export type ReviewType = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'

export interface IReview {
  reviewId: string,
  reviewType: ReviewType,
  reviewData: string,
  userPositiveRating: number,
  userNegativeRating: number,
  reviewAutor: string,
  reviewTitle: string,
  reviewDescription: string
}
