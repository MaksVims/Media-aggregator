import React, { FC, useCallback, useEffect, useState } from 'react';
import { AlertType, IFavoriteMovie } from 'types';
import { errorsMessage, successMessage } from '@/const';
import { useAlert } from '@/contexts';
import { FirebaseCollectionService } from '@/api';
import { MainPopup } from '@/components/ui/popup';

interface PopupEditFavoriteMovieProps {
  movie: IFavoriteMovie,
  recordId: string,
  isOpened: boolean,
  onClose: () => void,
}

const PopupEditFavoriteMovie: FC<PopupEditFavoriteMovieProps> = ({ movie, recordId, isOpened, onClose }) => {
  const { showAlert } = useAlert()
  const [isView, setIsView] = useState(movie.isView)
  const [comment, setComment] = useState(movie.comment)

  useEffect(() => {
    setIsView(movie.isView)
    setComment(movie.comment)
  }, [movie.movieId])

  const handleSave = useCallback(async () => {
    try {
      await FirebaseCollectionService.updateMovieInCollection(recordId, { ...movie, isView, comment })
      showAlert(successMessage.UPDATE_MOVIE_IN_COLLECTION, AlertType.SUCCESS)
      onClose()
    } catch {
      showAlert(errorsMessage.UPDATE_MOVIE_IN_COLLECTION, AlertType.ERROR)
    }
  }, [movie, recordId, isView, comment, onClose, showAlert])

  return (
    <MainPopup title={movie.nameRu} onClose={onClose} isOpened={isOpened}>
      <div className="flex flex-col gap-4 mt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isView}
            onChange={(e) => setIsView(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm">Просмотрено</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Заметка..."
          className="input w-full resize-none h-24 text-sm"
        />
        <button
          onClick={handleSave}
          className="w-full uppercase rounded-md hover:bg-primary px-6 py-2 hover:text-white tracking-wider font-semibold focus:outline-none bg-primary-light transition duration-100 text-black shadow-md cursor-pointer"
        >
          Сохранить
        </button>
      </div>
    </MainPopup>
  );
};

export default PopupEditFavoriteMovie;
