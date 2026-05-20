import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { hasCookie } from 'helpers';
import { TOKEN } from '@/const';

interface NoAccessUserProps {
  to: string,
  private?: boolean
}

const NoAccessUser: FC<NoAccessUserProps> = ({ children, to }) => {
  const router = useRouter()

  useEffect(() => {
    if (hasCookie(TOKEN)) {
      router.push(to)
    }
  }, [])

  return (
    <>
      {children}
    </>
  );
};

export default NoAccessUser;
