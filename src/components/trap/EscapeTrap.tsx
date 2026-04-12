import React, { FC, useEffect } from 'react';

interface EscapeTrapProps {
  trapHandle: () => void | Promise<void>
}

const EscapeTrap: FC<EscapeTrapProps> = ({ children, trapHandle }) => {
  useEffect(() => {
    const pressEscapeHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        trapHandle()
      }
    }
    document.addEventListener('keydown', pressEscapeHandler)
    return () => {
      document.removeEventListener('keydown', pressEscapeHandler)
    }
  }, [trapHandle])

  return (
    <>
      {children}
    </>
  );
};

export default EscapeTrap;
