import { IMovie } from 'types';

export type PROFESSION_KEY = 'PRODUCER' | 'ACTOR'

export interface IStaffByMovie {
  staffId: number,
  nameRu: string,
  nameEn: string,
  posterUrl: string
  professionText: string,
  professionKey: PROFESSION_KEY
}

export interface ISpecificStaff {
  personId: number,
  webUrl: string,
  nameRu: string,
  nameEn: string,
  sex: string,
  posterUrl: string,
  birthday: string,
  age: number,
  birthplace: string,
  profession: string,
  growth: number,
  facts: string[]
  films: IMovie[]
}
