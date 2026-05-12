import React, {useEffect} from 'react';
import {GetStaticProps, NextPage} from "next";
import {observer} from 'mobx-react-lite';
import {MovieService} from "@/api";
import {IResponseMoviesPremieres} from "types";
import {MoviesState} from "@/store";
import Seo from "@/hoc/Seo";
import {FooterLayout, MainLayout} from "@/components/layouts";
import {BarSortFilters, GridMovies, ScrollBarGenre} from "@/components/main";
import {BoxDisplayCenter} from "@/components/ui";

interface IPremieresPageProps {
  dataMovies: IResponseMoviesPremieres
}

const PremieresPage: NextPage<IPremieresPageProps> = ({dataMovies}) => {
  useEffect(() => {
    MoviesState.setMovies(dataMovies.items)
    return () => MoviesState.reset()
  }, [dataMovies.items])

  const filteredMovies = MoviesState.filteredMovies

  return (
    <Seo
      title="Ближайшие премьеры"
      keywords="Премьера, новинки"
    >
      <MainLayout>
        <FooterLayout>
          <main className="flex-1 flex flex-col">
            <ScrollBarGenre/>
            <BarSortFilters/>
            {filteredMovies.length ?
              <GridMovies movies={filteredMovies}/> : (
                <div className="relative flex-1">
                  <BoxDisplayCenter
                    title="Фильмы не найдены"
                    className="text-white text-xl"
                  />
                </div>
              )}
          </main>
        </FooterLayout>
      </MainLayout>
    </Seo>
  );
};

export default observer(PremieresPage);

export const getStaticProps: GetStaticProps<IPremieresPageProps> = async () => {
  try {
    const dataMovies = await MovieService.getPremiers()

    return {
      props: {
        dataMovies
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}