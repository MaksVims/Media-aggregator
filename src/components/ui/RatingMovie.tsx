import React, { FC } from 'react';
import { MdOutlineStarRate } from 'react-icons/md';
import theme from '@/const/theme';

interface IRatingMovie {
  rating: number,
  size: number
  className?: string
}

const RatingMovie: FC<IRatingMovie> = ({ rating, size, className }) => (
  <div className={`flex items-center ${className}`}>
    <MdOutlineStarRate
      color={theme.colors.yellow['400']}
      size={size}
      className="mr-1"
    />
    <span className="text-yellow-400">
      {rating}
    </span>
  </div>
);

export default React.memo(RatingMovie);
