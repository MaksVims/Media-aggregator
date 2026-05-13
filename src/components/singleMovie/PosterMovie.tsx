import React, { FC } from 'react';
import { IResponseMovieImages } from 'types';
import { useDragScroll } from '@/hooks';

interface PosterMovieProps {
  images: IResponseMovieImages
}

const PosterMovie: FC<PosterMovieProps> = ({ images }) => {
  const [sliderRef, handleMouseDown, hasDragged] = useDragScroll(1)

  if (!images.items.length) return null

  return (
    <section className="bg-white py-5">
      <h2 className="text-xl font-semibold mb-4 text-center">Кадры из фильма</h2>
      <div
        ref={sliderRef as React.RefObject<HTMLDivElement>}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2 select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {images.items.map((item, index) => (
          <a
            key={index}
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            draggable={false}
            onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
          >
            <img
              src={item.previewUrl}
              alt={`Кадр ${index + 1}`}
              draggable={false}
              className="h-28 xs:h-40 w-auto rounded-md object-cover hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export default PosterMovie
