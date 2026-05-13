import React, { FC } from 'react';
import { User } from '@firebase/auth';
import cn from 'classnames'

interface UserInfoProps {
  user: User
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const titleClass = cn('font-medium text-xl md:col-span-2')
  const contentClass = cn('xs:text-xl md:text-lg md:col-span-4')

  return (
    <ul className="space-y-2 grid grid-cols-2 items-baseline md:grid-cols-6 truncate">
      <span className={titleClass}>
        Имя
        :
      </span>
      <span className={contentClass}>
        {user?.displayName || 'Не указан'}
      </span>
      <span className={titleClass}>
        Email:
      </span>
      <span className={contentClass}>
        {user?.email}
      </span>
    </ul>
  );
};

export default UserInfo;
