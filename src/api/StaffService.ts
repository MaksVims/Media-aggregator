import { ISpecificStaff, IStaffByMovie } from 'types'
import { fetchMoviesOrStaff as fetchStaff } from 'helpers';
import { movieNormalize } from '@/factory/movieNormalize';

export default class StaffService {
  static async getStaffByMovie(movieId: number) {
    const url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${movieId}`
    return await fetchStaff(url) as IStaffByMovie[]
  }

  static async getSpecificStaff(staffId: number): Promise<ISpecificStaff> {
    const url = `https://kinopoiskapiunofficial.tech/api/v1/staff/${staffId}`
    const res = await fetchStaff(url) as ISpecificStaff
    return {
      ...res,
      films: res.films.map(movie => movieNormalize(movie))
    }
  }
}