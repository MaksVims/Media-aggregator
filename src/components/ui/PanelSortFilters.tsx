import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames'
import { SortType } from 'types';
import { getListActionsForBarFilters } from 'helpers';
import { MoviesState } from '@/store';

interface PanelSortFiltersProps {
  type?: 'default' | 'gray',
  notIncluded?: SortType
  classContainer?: string
}

const PanelSortFilters: FC<PanelSortFiltersProps> = ({ 
  type = 'default', 
  notIncluded, 
  classContainer 
}) => {
  const { filter, sortDirection } = MoviesState

  const data = useMemo(
    () => getListActionsForBarFilters(filter, notIncluded),
    [filter, notIncluded]
  )

  const activeClassName = cn({
    '!text-primary-light': type === 'default',
    '!text-black': type === 'gray',
  })

  const baseClassName = cn({
    'text-white': type === 'default',
    'bg-gray-200 rounded-md p-1 text-gray-400 drop-shadow-md': type === 'gray',
  })

  const getSortArrow = (sortType: SortType) => {
    if (!sortType || sortType === SortType.DEFAULT) return null

    const isDesc = sortDirection === 'desc'

    switch (sortType) {
      case SortType.RATING:
        return isDesc ? '↓' : '↑'     
      case SortType.YEAR:
        return isDesc ? '↓' : '↑' 
      case SortType.NAME:
        return isDesc ? '↓' : '↑'
      default:
        return null
    }
  }

  return (
    <ul className={`flex flex-center space-x-4 text-xs sm:text-sm ${classContainer || ''}`}>
      {data.map((item) => {
        const isActive = item.isActive
        const arrow = getSortArrow(item.type)

        return (
          <li key={item.title}>
            <button
              type="button"
              onClick={item.action}
              className={`${baseClassName} ${isActive ? activeClassName : ''} flex items-center gap-1 hover:opacity-90 transition-opacity`}
            >
              {item.title}
              {isActive && arrow && (
                <span className="text-xs font-medium opacity-75">
                  {arrow}
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default observer(PanelSortFilters)