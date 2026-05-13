import React, { FC } from 'react';
import { User } from '@firebase/auth';
import { UserInfo } from '@/components/profile';

interface UserCardProps {
  user: User,
  classNames?: string
}

const UserCard: FC<UserCardProps> = ({ user, classNames }) => (
  <div className={`flex flex-col space-y-6 ${classNames || ''}`}>
    <UserInfo user={user} />
  </div>
);

export default UserCard;
