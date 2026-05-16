import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import { AlertType } from 'types';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import { errorsMessage, successMessage } from '@/const';

interface FormRemoveAccountProps {
  onClose: () => void
}

const FormRemoveAccount: FC<FormRemoveAccountProps> = ({ onClose }) => {
  const focusRef = useRef<HTMLInputElement | null>(null)
  const [currentEmail, setCurrentEmail] = useState('')
  const router = useRouter()
  const { user, deleteAccount } = useAuth()
  const { showAlert } = useAlert()

  const isExact = currentEmail === user?.email

  useEffect(() => {
    setTimeout(() => focusRef.current?.focus())
  }, [])

  const handlerRemoveAccount = async () => {
    try {
      await deleteAccount()
      showAlert(successMessage.REMOVE_ACCOUNT, AlertType.SUCCESS)
      await router.push('/')
    } catch (e) {
      showAlert(errorsMessage.REMOVE_ACCOUNT, AlertType.ERROR)
    }
  }

  return (
    <div>
      <div className="flex-center flex-wrap space-y-6">
        <input
          placeholder="Email"
          type="text"
          className="input w-full hover:border-red-400 focus:border-red-400"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          ref={focusRef}
        />
        <div className="space-x-4 flex justify-end">
          <button
            className="btn text-black hover:bg-gray-300"
            onClick={onClose}
          >
            Отмена
          </button>
          <button
            disabled={!isExact}
            className="btn btn-danger"
            onClick={handlerRemoveAccount}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormRemoveAccount;
