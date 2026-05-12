import React, {useCallback, useEffect} from 'react';
import {GetServerSideProps, NextPage} from "next";
import {observer} from 'mobx-react-lite';
import {IResponseSearchByKeyWord, SortType} from "types";
import {MovieService} from "@/api";
import {MoviesState} from "@/store";
import {usePagination} from "@/hooks";
import Seo from "@/hoc/Seo";
import {FooterLayout, MainLayout} from "@/components/layouts";
import {BarSortFilters, GridMovies, ScrollBarGenre} from "@/components/main";
import {BoxDisplayCenter, BoxLoader, BtnLoadNextPage} from "@/components/ui";

interface SearchPageProps {
  dataMovies: IResponseSearchByKeyWord
}

const SearchPage: NextPage<SearchPageProps> = ({dataMovies}) => {
  const totalPages = Math.ceil(dataMovies.searchFilmsCountResult / 20)
  const filter = MoviesState.filter

  const [fetchNextPage, loadNextPage, currentPage] = usePagination(
    totalPages,
    useCallback(async (page: number) => {
      const result = await MovieService.getMoviesByKeyWord(dataMovies.keyword, page)
      MoviesState.setMovies(result.films)
    }, []))

  const filteredMovies = MoviesState.filteredMovies

  useEffect(() => {
    MoviesState.setMovies(dataMovies.films)
    return () => MoviesState.reset()
  }, [dataMovies.films])

  const paginationView = currentPage < totalPages && filter !== SortType.FAVORITE && filteredMovies.length && (
    <BtnLoadNextPage
      fetching={fetchNextPage}
      className="text-center my-8"
    />
  )

  return (
    <Seo
      title={"Результаты поиска"}
      keywords={"Лучшие фильмы, топ фильмов"}
      indexed={false}
    >
      <MainLayout>
        <FooterLayout>
          <main className="page-main">
            <ScrollBarGenre/>
            <BarSortFilters/>
            <div className="text-white text-xl text-center mt-10">
              <h2>Всего найдено: {dataMovies.searchFilmsCountResult} фильмов</h2>
            </div>
            {filteredMovies.length ?
              <GridMovies movies={filteredMovies}/> : (
                <div className="flex flex-1">
                  <BoxDisplayCenter
                    title="Фильмы не найдены"
                    className="text-white text-xl"
                  />
                </div>
              )}
            <div className="relative">
              {loadNextPage ? <BoxLoader/> : paginationView}
            </div>
          </main>
        </FooterLayout>
      </MainLayout>
    </Seo>
  );
};

export default observer(SearchPage);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const keyword = ctx.query.keyword
  const dataMovies = await MovieService.getMoviesByKeyWord(String(keyword), 1)

  return {
    props: {
      dataMovies
    }
  }
}