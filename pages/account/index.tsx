import React from 'react';
import { GetServerSideProps, NextPage } from "next";
import { observer } from 'mobx-react-lite';
import { ParsedUrlQuery } from 'querystring';
import { useAuth } from '@/contexts';
import { CollectionState } from '@/store';
import { MainLayout } from '@/components/layouts';
import { BoxLoader } from '@/components/ui';
import { AccountControlPanel, FavoriteMovieList, UserCardProfile } from '@/components/profile';
import Seo from '@/hoc/Seo';
import { TOKEN } from "@/const";

const Profile: NextPage = () => {
  const { user } = useAuth()
  const collection = CollectionState.moviesToCollection
  const loadCollection = CollectionState.loading

  return (
    <Seo title={`Личный кабинет ${user?.displayName || ''}`} indexed={false} >
      <MainLayout>
        <div className="absolute inset-0 z-0 bg-profile bg-cover bg-center bg-no-repeat" />

        <main className="flex-1 overflow-hidden relative z-10 flex justify-center px-4 py-4 pb-6">
          <section className="w-full max-w-[1000px] flex flex-col gap-4 h-full">

            {/* Блок с фильмами — занимает основную высоту, скроллится внутри */}
            <div className={`flex-1 bg-white rounded-md p-6 text-black relative overflow-y-auto${collection.length ? ' min-h-[550px]' : ''}`}>
              {loadCollection ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-md z-20">
                  <BoxLoader />
                </div>
              ) : (
                <FavoriteMovieList classNames="w-full" title="Любимые фильмы" movies={collection} />
              )}
            </div>

            {/* Нижний ряд — профиль и управление аккаунтом */}
            <div className="flex flex-col md:flex-row gap-4 flex-shrink-0">
              <div className="bg-white p-6 rounded-md w-full flex-1 text-black flex flex-col relative">
                <UserCardProfile user={user!} classNames="w-full bg-white rounded-md" />
              </div>
              <div className="bg-white p-6 rounded-md flex justify-center items-center md:w-auto w-full">
                <AccountControlPanel />
              </div>
            </div>

          </section>
        </main>
      </MainLayout>
    </Seo>
  );
};

export default observer(Profile);

export const getServerSideProps: GetServerSideProps<ParsedUrlQuery> = async (context) => {
  const token = context.req.cookies[TOKEN]

  if (token) {
    return {
      props: {}
    }
  } else {
    return {
      redirect: {
        destination: '/auth/login',
        statusCode: 308
      }
    }
  }
}
