import { IMovie } from 'types';
import { SortType } from '../types/filtersTypes';

export function showPaginationButton(
  currentPage: number,
  totalPages: number,
  filter: SortType,
  filteredMovies: IMovie[]) {
    return currentPage < totalPages
    && filter !== SortType.FAVORITE
    && filteredMovies.length
}