import React, { FC } from 'react';
import { Portal } from '@/components/ui/popup';
import { EscapeTrap } from '@/components/trap';

interface OverlayPopupProps {
  onClose: () => void,
  isOpened: boolean,
  className?: string
}

const OverlayPopup: FC<OverlayPopupProps> = ({
  children, onClose, isOpened, className,
}) => {
  if (!isOpened) {
    return null
  }

  return (
    <Portal>
      <EscapeTrap trapHandle={onClose}>
        <div className={`fixed z-30 inset-0 bg-black bg-opacity-70 flex-center p-4 ${className || ''}`}>
          <div
            className="absolute inset-0 z-[-1] cursor-pointer"
            onClick={onClose}
          />
          {children}
        </div>
      </EscapeTrap>
    </Portal>
  );
};

export default OverlayPopup;
