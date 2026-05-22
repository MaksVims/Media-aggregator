import { AiOutlineHome } from 'react-icons/ai';
import { BsLightningCharge, BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { MdOutlineInput } from 'react-icons/md';
import { INavItem } from 'types';

export const NAV_ITEMS: INavItem[] = [
  { title: 'Главная', Icon: AiOutlineHome, path: '/' },
  { title: 'Премьеры', Icon: BsLightningCharge, path: '/premieres' },
  {
    title: 'Аккаунт', Icon: BiUser, path: '/account', isAuth: true, redirect: '/auth/register',
  },
  { title: 'Поиск', Icon: BsSearch, path: '/search' },
  { title: 'Войти', Icon: MdOutlineInput, path: '/auth/login' },
]
