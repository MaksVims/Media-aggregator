import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { FiltersState } from '@/store';
import { ScrollBarItem } from '@/components/main';
import { useDragScroll } from '@/hooks';

const ScrollBarGenre: FC = () => {
  const { allGenres } = FiltersState
  const [scrollRef, handleMouseDown, hasDragged] = useDragScroll(1.5)

  return (
    <div className="relative">
      <ul
        ref={scrollRef as React.RefObject<HTMLUListElement>}
        className="pt-4 px-8 flex xl:space-x-16 space-x-10 overflow-x-scroll scrollbar-hide select-none cursor-grab active:cursor-grabbing user-select-none"
        onMouseDown={handleMouseDown}
        onClickCapture={
          (e) => {
            if (hasDragged.current) { e.preventDefault(); e.stopPropagation() }
          }
        }
      >
        {allGenres.map((genre) => (
          <ScrollBarItem
            key={genre.id}
            item={genre}
          />
        ))}
      </ul>
      <div className="absolute right-0 top-0 h-14 w-1/12 bg-gradient-to-l from-primary-dark" />
    </div>
  );
};

export default observer(ScrollBarGenre);
