import React, { FC } from 'react';
import PopupTermsOfUsers from './PopupTermsOfUsers';
import { useToggle } from '@/hooks';
import { Logo } from '@/components/ui'

const Footer: FC = () => {
  const [isOpenPopupTerms, setIsOpenPopupTerms, closePopupTerms] = useToggle()

  return (
    <footer className="bg-black p-4 text-white xl:px-8 border-2 border-transparent">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:justify-between">
        <Logo size={40}/>
        <div className="flex flex-col items-center space-y-2">
          <button
            type="button"
            className=" cursor-pointer hover:underline"
            onClick={() => setIsOpenPopupTerms(true)}
          >
            Пользовательское соглашение
          </button>
          <span className="text-xs">Не для коммерческого использования</span>
          <span className="text-xs">
            Данные взяты с
            <a
              target="_blank"
              rel="noreferrer"
              href="https://kinopoiskapiunofficial.tech/"
              className="link-blur-color hover:underline ml-1"
            >
              kinopoiskapiunofficial.tech
            </a>
          </span>
        </div>
      </div>
      <PopupTermsOfUsers
        onClose={closePopupTerms}
        isOpened={isOpenPopupTerms}
      />
    </footer>
  );
};

export default Footer;
