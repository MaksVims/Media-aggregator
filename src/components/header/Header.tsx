import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '@/const/header';
import { NavItem } from '@/components/header';
import { Logo } from '@/components/ui';

const Header: FC = () => {
  const router = useRouter()
  return (
    <header className="flex flex-col p-5 items-center sm:flex-row sm:justify-between h-auto relative z-20 flex-basis">
      <nav className="w-full mb-2 sm:mb-0 mt-2">
        <ul className="flex-center sm:justify-evenly max-w-2xl">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              active={router.asPath === item.path}
            />
          ))}
        </ul>
      </nav>
      <Logo size={80}/>
    </header>
  );
};

export default Header;
