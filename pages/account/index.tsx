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
        <main className="flex justify-center items-center absolute-main min-screen px-4 md:py-0 pb-6 bg-no-repeat bg-center bg-profile bg-cover">
          <section className="bg-transparent relative rounded-md overflow-hidden w-full max-w-[1000px] mx-auto z-10">
            <div className="p-4 md:p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

              <div className="bg-white p-6 rounded-md w-full text-black flex flex-col relative min-h-[350px]">
                {loadCollection ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white rounded-md z-20">
                    <BoxLoader />
                  </div>
                ) : (
                  <FavoriteMovieList classNames="scrollbar-hide w-full" title="Любимые фильмы" movies={collection} />
                )}
              </div>

              <div className="flex flex-col gap-6 w-full justify-between">
                <div className="bg-white p-6 rounded-md w-full flex-1">
                  <UserCardProfile user={user!} classNames="w-full bg-white rounded-md" />
                </div>

                <div className="bg-white p-6 rounded-md flex justify-center items-center w-full">
                  <AccountControlPanel />
                </div>
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
