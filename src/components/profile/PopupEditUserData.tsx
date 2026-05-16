import React, { FC, useCallback } from 'react';
import { AlertType, EditUserDataFormValues } from 'types';
import { errorsMessage, successMessage } from '@/const';
import { useAlert, useAuth } from '@/contexts';
import { MainPopup } from '@/components/ui/popup';
import { FormEditUserData } from '@/components/profile';

interface PopupEditUserData {
  onClose: () => void,
  isOpened: boolean
}

const PopupEditUserData: FC<PopupEditUserData> = ({ isOpened, onClose }) => {
  const { showAlert } = useAlert()
  const { updateName } = useAuth()

  const saveEditChanges = useCallback(async (values: EditUserDataFormValues) => {
    try {
      const {username } = values
      await updateName(username)
      showAlert(successMessage.UPDATE_PROFILE, AlertType.SUCCESS)
      onClose()
    } catch (e) {
      showAlert(errorsMessage.UPDATE_PROFILE, AlertType.ERROR)
    }
  }, [onClose, updateName])

  return (
    <MainPopup
      title="Редактировать профиль"
      onClose={onClose}
      isOpened={isOpened}
    >
      <FormEditUserData submitHandler={saveEditChanges} />
    </MainPopup>
  );
};

export default PopupEditUserData;
