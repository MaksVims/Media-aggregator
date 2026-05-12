// helpers/getListActionsForBarFilters.ts
import { SortType } from 'types';
import MoviesState from '@/store/MoviesState';

export default function getListActionsForBarFilters(
  filter: SortType,
  notIncluded?: SortType,
) {
  const actions = [
    {
      title: 'Без сортировки',
      isActive: filter === SortType.DEFAULT,
      action: () => MoviesState.setFilter(SortType.DEFAULT),
      type: SortType.DEFAULT,
    },
    {
      title: 'По названию',
      isActive: filter === SortType.NAME,
      action: () => MoviesState.setFilter(SortType.NAME),
      type: SortType.NAME,
    },
    {
      title: 'По годам',
      isActive: filter === SortType.YEAR,
      action: () => MoviesState.setFilter(SortType.YEAR),
      type: SortType.YEAR,
    },
    {
      title: 'По рейтингу',
      isActive: filter === SortType.RATING,
      action: () => MoviesState.setFilter(SortType.RATING),
      type: SortType.RATING,
    },
  ]

  if (notIncluded) {
    return actions.filter((action) => action.type !== notIncluded)
  }

  return actions
}