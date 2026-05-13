import { IMovie, IReview } from 'types';

export interface IResponseMoviesByFiltersOrTop {
  pagesCount: number,
  films: IMovie[]
}

export interface IResponseSearchByKeyWord {
  keyword: string,
  pagesCount: number,
  searchFilmsCountResult: number,
  films: IMovie[]
}

export interface IResponseMoviesPremieres {
  total: number,
  items: IMovie[]
}

export interface IResponseReviewsByMovie {
  page: number,
  reviewAllCount: number,
  pagesCount: number,
  reviews: IReview[]
}

export interface IResponseExternalSource {
  total: number,
  items: {
    logoUrl: string,
    platform: string,
    url: string
  }[]
}

export interface IResponseMovieImages {
  total: number,
  items: {
    imageUrl: string,
    previewUrl: string
  }[]
}

export interface IResponseMovieFacts {
  total: number,
  items: {
    text: string,
    type: 'FACT' | 'BLOOPER',
    spoiler: boolean
  }[]
}