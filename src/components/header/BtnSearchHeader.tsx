import React, { FC } from 'react';
import { BsSearch } from 'react-icons/bs';
import { PopupSearch } from '@/components/ui/popup';
import { useToggle } from '@/hooks';

const BtnSearchHeader: FC = () => {
  const [isOpenPopupSearch, setIsOpenPopupSearch, closePopupSearch] = useToggle()

  return (
    <>
      <button
        type="button"
        className="w-full items-center group w-14 flex flex-col cursor-pointer py-[5px] sm:py-1 sm:w-20"
        onClick={() => setIsOpenPopupSearch(true)}
      >
        <BsSearch
          size={30}
          color="#fff"
          className="sm:mb-2 h-6 group-hover:animate-bounce xs:h-10"
        />
        <span className="text-for-nav">
          Поиск
        </span>
      </button>
      <PopupSearch
        onClose={closePopupSearch}
        isOpened={isOpenPopupSearch}
      />
    </>
  );
};

export default BtnSearchHeader;
