import { IMovie, ISpecificStaff } from 'types';

export default function getUniqMoviesForPerson(person: ISpecificStaff) {
  const films = person.films.slice()
  const uniqFilms: { [key: string]: IMovie } = {}

  films.filter((film) => {
    if (uniqFilms[film.movieId]) return false

    uniqFilms[film.movieId] = film
    return true
  })

  return Object.values(uniqFilms)
    .filter((film) => film.nameRu)
}
