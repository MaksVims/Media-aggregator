import React, { FC, useEffect } from 'react';
import { AlertType } from 'types';
import { useAuth } from '@/contexts/AuthContext';
import { CollectionState } from '@/store';
import { useAlert } from '@/contexts/AlertContext';
import { CustomError } from '@/factory/CustomError';

const CollectionContext = React.createContext({})

const CollectionProvider: FC = ({ children }) => {
  const { user, loadingUser } = useAuth()
  const { showAlert } = useAlert()

  useEffect(() => {
    if (loadingUser || !user) return

    CollectionState.loadCollection(user.uid).catch((e) => {
      if (e instanceof CustomError) {
        showAlert(e.message, AlertType.ERROR)
      }
    })
  }, [user, loadingUser])

  return (
    <CollectionContext.Provider value={{}}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
