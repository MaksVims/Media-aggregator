import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { PanelSortFilters } from '@/components/ui';
import { MoviesState } from '@/store';
import { useAuth } from '@/contexts/AuthContext';

const BarSortFilters: FC = () => {
  const { viewMode, setViewMode } = MoviesState;
  const { user } = useAuth();

  const baseClass = 'flex items-center gap-1 hover:opacity-90 transition-opacity border-none text-white space-x-4 text-xs sm:text-sm'
  const activeClass = 'text-primary-light'

  return (
    <div className="flex flex-col gap-4 mt-10 px-4">
      <div className="flex flex-wrap gap-4 justify-center" >

        <div>
          <PanelSortFilters type="default" />
        </div>

        {user && (
          <div className="flex gap-4 ml-6">
            <button
              onClick={() => setViewMode('all')}
              className={`${baseClass} ${viewMode === 'all' ? activeClass : ''}`}
            >
              Весь контент
            </button>

            <button
              onClick={() => setViewMode('favorite')}
              className={`${baseClass} ${viewMode === 'favorite' ? activeClass : ''}`}
            >
              Избранное
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(BarSortFilters);