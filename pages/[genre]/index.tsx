import { useCallback, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { observer } from 'mobx-react-lite';
import { IFilterGenre, IResponseMoviesByFiltersOrTop } from 'types';
import { formatFirstToUppercase, showPaginationButton } from 'helpers';
import { DATA_FILTERS } from '@/const/dataFilters';
import { MoviesState } from '@/store';
import { usePagination } from '@/hooks';
import { MovieService } from '@/api';
import { BoxDisplayCenter, BtnLoadNextPage } from '@/components/ui';
import { FooterLayout, MainLayout } from '@/components/layouts';
import { BarSortFilters, GridMovies, ScrollBarGenre } from '@/components/main';
import { Seo } from '@/hoc';
import { PaginationBox } from '@/components/ui';


interface IGenrePageProps {
  dataMovies: IResponseMoviesByFiltersOrTop,
  genre: string,
  genreId: number
}

const GenrePage: NextPage<IGenrePageProps> = ({ dataMovies, genre, genreId }) => {
  const totalPages = dataMovies.pagesCount
  const { filter } = MoviesState

  const [fetchNextPage, loadNextPage, currentPage] = usePagination(
    totalPages,
    useCallback(async (page: number) => {
      const result = await MovieService.getMoviesByFilters({ page, genre: genreId })
      MoviesState.setMovies(result.films)
    }, [genreId]),
  )

  const { filteredMovies } = MoviesState

  useEffect(() => {
    MoviesState.setMovies(dataMovies.films)
    return () => MoviesState.reset()
  }, [dataMovies.films])

  const paginationView = MoviesState.viewMode !== 'favorite'
    && showPaginationButton(currentPage, totalPages, filter, filteredMovies)
    && (
      <BtnLoadNextPage
        fetching={fetchNextPage}
        className="text-center my-8"
      />
    )

  return (
    <Seo
      title={`${formatFirstToUppercase(genre)}`}
      keywords="Лучшие фильмы, топ фильмов, коллекции"
    >
      <MainLayout>
        <FooterLayout>
          <main className="page-main">
            <ScrollBarGenre />
            <BarSortFilters />
            {filteredMovies.length
              ? <GridMovies movies={filteredMovies} /> : (
                <div className="flex flex-1 relative">
                  <BoxDisplayCenter
                    title="Фильмы не найдены"
                    className="text-white text-xl"
                  />
                </div>
              )}
            <PaginationBox loading={loadNextPage} movies={filteredMovies}>
              {paginationView}
            </PaginationBox>
          </main>
        </FooterLayout>
      </MainLayout>
    </Seo>
  );
};

export default observer(GenrePage);

interface IParams extends ParsedUrlQuery {
  genre: string
}

export const getStaticProps: GetStaticProps<IGenrePageProps, IParams> = async (context) => {
  try {
    const { genre } = context.params!

    if (genre === 'all') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    const filterItem = DATA_FILTERS.genres.find((item: IFilterGenre) => item.title === genre)!
    const dataMovies = await MovieService.getMoviesByFilters({ genre: filterItem.id, page: 1 })

    return {
      props: {
        dataMovies,
        genre: filterItem.genre,
        genreId: filterItem.id,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})
