import React, { FC } from 'react';
import { ImExit } from 'react-icons/im';
import { AlertType } from 'types';
import { useAuth } from '@/contexts/AuthContext';
import successMessage from '@/const/successMessage';
import errorsMessage from '@/const/errorsMessage';
import { useAlert } from '@/contexts';

const BtnSignOut: FC = () => {
  const { logout } = useAuth()
  const { showAlert } = useAlert()

  const signOut = async () => {
    try {
      await logout()
      showAlert(successMessage.LOGOUT, AlertType.SUCCESS)
    } catch (e) {
      showAlert(errorsMessage.LOGOUT, AlertType.ERROR)
    }
  }

  return (
    <button
      type="button"
      className="w-full items-center group w-14 flex flex-col cursor-pointer py-[5px] sm:py-1 sm:w-20"
      onClick={signOut}
    >
      <ImExit
        size={30}
        color="#fff"
        className="sm:mb-2 h-6 group-hover:animate-bounce xs:h-10"
      />
      <span className="text-for-nav">
        Выйти
      </span>
    </button>
  );
};

export default BtnSignOut
