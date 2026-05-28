import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { IResponseReviewsByMovie, IResponseExternalSource, ISingleMovie, IStaffByMovie, IResponseMovieImages, IResponseMovieFacts, IReponseMovieAwards } from "types";
import { MovieService, StaffService } from "@/api";
import { Seo } from "@/hoc";
import { FooterLayout, MainLayout } from "@/components/layouts";
import { MovieCardContent, MovieCardImg, ReviewItem, PosterMovie, MovieFacts } from "@/components/singleMovie";

interface IMoviePageProps {
  movie: ISingleMovie,
  staff: IStaffByMovie[]
  responseReviews: IResponseReviewsByMovie
  responseExternalSource: IResponseExternalSource,
  responseMovieImages: IResponseMovieImages,
  responseFacts: IResponseMovieFacts,
  responseAwards: IReponseMovieAwards
}

const MovieId: NextPage<IMoviePageProps> = ({ movie, staff, responseReviews, responseExternalSource, responseMovieImages, responseFacts, responseAwards }) => {

  return (
    <Seo
      title={movie.nameRu}
      keywords={`${movie.nameRu} ${movie.genres.map(genre => genre.genre).join(',')}`}
      description={movie.description}
    >
      <MainLayout>
        <FooterLayout>
          <main
            className="mx-auto mt-4 xl:mb-10 max-w-[1024px] flex flex-col rounded-tl-md rounded-tr-md flex-grow">
            <section
              className="flex flex-col md:mx-auto items-center bg-white py-7 px-2 md:flex-row md:items-start md:px-6">
              <MovieCardImg movie={movie} />
              <MovieCardContent movie={movie} staff={staff} awards={responseAwards} />
            </section>

            <section className="py-7 bg-white text-center">
              <div className="px-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Смотреть «{movie.nameRu}» на платформах:
                </h2>

                {responseExternalSource.items.length > 0 ? (
                  <ul className="flex flex-wrap justify-center gap-4 list-none p-0">
                    {responseExternalSource.items.filter(item => item.platform != 'Wink').map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center transition-transform hover:scale-105"
                          aria-label={`Смотреть на ${item.platform}`}
                        >
                          <div className="flex items-center justify-center p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:border-blue-200 group-hover:shadow-sm transition-all">
                            <img
                              src={item.logoUrl}
                              alt={item.platform}
                              className="max-w-full max-h-full object-contain"
                              style={{ width: '60px' }}
                            />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm italic">Информации о легальных площадках пока нет</p>
                )}
              </div>
            </section>
            <PosterMovie images={responseMovieImages} />
            <MovieFacts facts={responseFacts} />

            {(() => {
              const reviews = responseReviews.reviews?.filter(r => r.reviewTitle) ?? []
              return reviews.length > 0 ? (
                <section className="py-7 bg-white text-center">
                  <ul className="px-4 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Рецензии</h2>
                    {reviews.map(review => (
                      <li key={review.reviewId}>
                        <ReviewItem review={review} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null
            })()}
          </main>
        </FooterLayout>
      </MainLayout>
    </Seo>

  );
};

export default MovieId;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

interface IParams extends ParsedUrlQuery {
  movieId: string
}

export const getStaticProps: GetStaticProps<IMoviePageProps, IParams> = async (context) => {
  const { movieId } = context.params!
  try {
    const movie = await MovieService.getMovieById(Number(movieId))
    const staff = await StaffService.getStaffByMovie(Number(movieId))
    const responseReviews = await MovieService.getReviewsByMovie(Number(movieId))
    const responseExternalSource = await MovieService.getExternalSource(Number(movieId))
    const responseMovieImages = await MovieService.getMovieImages(Number(movieId))
    const responseFacts = await MovieService.getMovieFacts(Number(movieId))
    const responseAwards = await MovieService.getMovieAwards(Number(movieId))

    return {
      props: {
        movie,
        staff,
        responseReviews,
        responseExternalSource,
        responseMovieImages,
        responseFacts,
        responseAwards
      },
      revalidate: 43200 // 12 часов
    }
  } catch {
    return {
      notFound: true
    }
  }
}