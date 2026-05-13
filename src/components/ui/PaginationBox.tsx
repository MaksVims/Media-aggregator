import React, { FC } from 'react'
import { IMovie } from 'types';

interface PaginationBox {
  loading: boolean,
  movies: IMovie[]
}

const PaginationBox: FC<PaginationBox> = ({ loading, children, movies }) => {
  return (
    <div
      className={`bg-primary-dark mt-auto w-full flex items-center justify-center
      ${movies.length ? 'h-[90px]' : 'h-auto'}`}
    >
      {loading ? <div className="lds-dual-ring" /> : children}
    </div>
  )
}

export default PaginationBox