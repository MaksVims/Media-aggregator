import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { AlertType } from 'types';
import { useToggle } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import { PopupRemoveAccount } from '@/components/profile';
import { errorsMessage, successMessage } from '@/const';

const AccountControlPanel: FC = () => {
  const [
    isOpenRemoveAccountPopup,
    setRemoveAccountPopupIsOpen,
    closeRemoveAccountPopup,
  ] = useToggle()
  const router = useRouter()
  const { logout } = useAuth()
  const { showAlert } = useAlert()

  const handleLogout = async () => {
    try {
      await logout()
      await router.push('/')
      showAlert(successMessage.LOGOUT, AlertType.SUCCESS)
    } catch {
      showAlert(errorsMessage.LOGOUT, AlertType.ERROR)
    }
  }

  return (
    <div
      className="flex flex-col space-y-4 items-center justify-center max-h-24"
    >
      <button
        type="button"
        onClick={handleLogout}
        className="btn btn-danger"
      >
        Выход
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => setRemoveAccountPopupIsOpen(true)}
      >
        Удаление аккаунта
      </button>
      <PopupRemoveAccount
        onClose={closeRemoveAccountPopup}
        isOpened={isOpenRemoveAccountPopup}
      />
    </div>
  );
};

export default AccountControlPanel;
