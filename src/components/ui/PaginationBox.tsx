import React, { FC } from 'react'
import { Loader } from '@/components/ui';
import { MovieForGrid } from '@/factory/MovieForGrid';

interface PaginationBox {
  loading: boolean,
  movies: MovieForGrid[]
}

const PaginationBox: FC<PaginationBox> = ({ loading, children, movies }) => {
  return (
    <div 
    className={` relative bg-primary-dark mt-auto w-full flex flex-col items-center justify-end 
      ${movies.length ? "h-[70px]" : "h-auto"} `}>
      {loading ? <Loader /> : children}
    </div>
  )
}

export default PaginationBox