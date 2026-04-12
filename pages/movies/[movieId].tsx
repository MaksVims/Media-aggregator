import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {ParsedUrlQuery} from "querystring";

import {IResponseReviewsByMovie, IResponseExternalSource, ISingleMovie, IStaffByMovie, IResponseMovieImages} from "types";
import {MovieService, StaffService} from "@/api";
import {Seo} from "@/hoc";
import {FooterLayout, MainLayout} from "@/components/layouts";
import {MovieCardContent, MovieCardImg, ReviewItem} from "@/components/singleMovie";


interface IMoviePageProps {
  movie: ISingleMovie,
  staff: IStaffByMovie[]
  responseReviews: IResponseReviewsByMovie
  responseExternalSource: IResponseExternalSource,
  responseMovieImages: IResponseMovieImages
}

const MovieId: NextPage<IMoviePageProps> = ({movie, staff, responseReviews, responseExternalSource, responseMovieImages}) => {
  console.log(responseMovieImages);
  
  return (
    <Seo
      title={movie.nameRu}
      keywords={`${movie.nameRu} ${movie.genres.map(genre => genre.genre).join(',')}`}
      description={movie.description}
    >
      <MainLayout>
        <FooterLayout>
          <main
            className="mx-auto mt-4 xl:mb-10 max-w-[1024px] flex flex-col rounded-tl-md rounded-tr-md">
            <section
              className="flex flex-col md:mx-auto items-center bg-white py-6 px-2 md:flex-row md:items-start md:px-6">
              <MovieCardImg movie={movie}/>
              <MovieCardContent movie={movie} staff={staff}/>
            </section>  

            <section className="pt-6 pb-8 bg-white flex-1 text-center border-t border-gray-100">
              <div className="px-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Смотреть «{movie.nameRu}» на платформах:
                </h2>
                
                {responseExternalSource.items.length > 0 ? (
                  <ul className="flex flex-wrap justify-center gap-4 list-none p-0">
                    {responseExternalSource.items.slice(0, -1).map((item, index) => (
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
                              style={{width:'60px'}}
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
            <section className="pt-6 bg-white flex-1 text-center">
              {/* <div className="px-4">
                <h2 className="font-medium mb-2 space-x-1">
                  <span>Смотреть трейлер {movie.nameRu} онлайн</span>
                  <a
                    // href={`${responseTrailer.items}`}
                    target="_blank"
                    rel="noreferrer"
                    className="link-blur-color"
                  >
                    тут
                  </a>
                </h2>
              </div> */}
              {/* <video
                src="#"
                controls={true}
                className="flex-1 h-[400px] w-full"
              /> */}
              <ul className="px-2 p-4 sm:!px-4 space-y-4">
                <h2 className="text-xl font-semibold my-4">Рецензии на фильм</h2>
                {responseReviews.reviews
                  ?.filter(review => review.reviewTitle)
                  .map(review => (
                    <li key={review.reviewId}>
                      <ReviewItem review={review}/>
                    </li>
                  ))}
              </ul>
            </section>
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
  const {movieId} = context.params!
  try {
    const movie = await MovieService.getMovieById(Number(movieId))
    const staff = await StaffService.getStaffByMovie(Number(movieId))
    const responseReviews = await MovieService.getReviewsByMovie(Number(movieId))
    const responseExternalSource = await MovieService.getExternalSource(Number(movieId))
    const responseMovieImages = await MovieService.getMovieImages(Number(movieId))

    return {
      props: {
        movie,
        staff,
        responseReviews,
        responseExternalSource,
        responseMovieImages
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}