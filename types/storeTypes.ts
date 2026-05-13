import { IFavoriteMovie } from "./movieTypes"

export type TypeCollection = {
  [key: string]: IFavoriteMovie
}

export type TypeMapRecordsToCollection = {
  [key: string]: string
}
