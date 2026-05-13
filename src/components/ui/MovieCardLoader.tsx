import React, { FC } from 'react'

const MovieCardLoader: FC = () => (
  <div className="animate-pulse w-full">
    <div className="relative w-full rounded-md bg-gray-600" style={{ paddingBottom: '150%' }} />
    <div className="mt-2 h-3 bg-gray-600 rounded w-3/4" />
  </div>
)

export default MovieCardLoader
