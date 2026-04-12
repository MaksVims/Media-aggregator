import { IMovieByFilterOrTop, IMoviePremier, IReview } from 'types';

export interface IResponseMoviesByFiltersOrTop {
  pagesCount: number,
  films: IMovieByFilterOrTop[]
}

export interface IResponseSearchByKeyWord {
  keyword: string,
  pagesCount: number,
  searchFilmsCountResult: number,
  films: IMovieByFilterOrTop[]
}

export interface IResponseMoviesPremieres {
  total: number,
  items: IMoviePremier[]
}

export interface IResponseReviewsByMovie {
  page: number,
  reviewAllCount: number,
  pagesCount: number,
  reviews: IReview[]
}

export interface IResponseExternalSource {
  total: number,
  items: [
    {
      logoUrl: string,
      platform: string,
      url: string
    }
  ]
}

export interface IResponseMovieImages {
  total: number,
  items: [
    {
      imageUrl: string,
      previewUrl: string
    }
  ]
}