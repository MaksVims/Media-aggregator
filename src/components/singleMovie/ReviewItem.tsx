import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames'
import { IReview } from 'types';
import { getFormatDate } from 'helpers';
import { useToggle } from '@/hooks';
import { LikeAndDislikeBar } from '@/components/ui';

export interface ReviewItemProps {
  review: IReview
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
  const [isOpen, setIsOpen] = useToggle()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current?.style?.maxHeight = isOpen ? `${containerRef.current?.scrollHeight}px` : '0px'
    }
  }, [isOpen])

  const articleClass = cn({
    'bg-green-100': review.reviewType === 'POSITIVE',
    'bg-red-200': review.reviewType === 'NEGATIVE',
    'bg-yellow-50': review.reviewType === 'NEUTRAL',
  })

  const contentClass = cn({
    'smooth-height px-4 sm:px-6': true,
    'overflow-hidden max-h-0': !isOpen,
  })

  return (
    <article className={`rounded-xl overflow-hidden ${articleClass}`}>
      <button
        type="button"
        onClick={() => setIsOpen()}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-sm">{review.reviewTitle}</p>
          <p className="flex-shrink-0 text-xs text-gray-500">{review.reviewAutor}</p>
        </div>
      </button>

      <div className={contentClass} ref={containerRef}>
        <p className="text-gray-color text-xs text-justify">
          {review.reviewDescription}
        </p>
        <div className="text-left text-xs text-gray-color flex items-center justify-between py-3 mt-2 border-t border-black/10">
          <div>
            <i>Автор: {review.reviewAutor}</i>
            <div>{getFormatDate(review.reviewData)}</div>
          </div>
          <LikeAndDislikeBar
            dislikeValue={review.userNegativeRating}
            likeValue={review.userPositiveRating}
          />
        </div>
      </div>
    </article>
  );
};

export default ReviewItem;
