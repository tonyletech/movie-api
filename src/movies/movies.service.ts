import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepo: MoviesRepository,
    private readonly ratingsService: RatingsService,
  ) {}

  async getMovieById(id: number) {
    const movie = await this.moviesRepo.findById(id);
    if (!movie) return null;
    const averageRating = await this.ratingsService.getAverage(id);
    return {
      data: {
        ...movie,
        budget: `$${movie.budget.toLocaleString()}`,
        genres: JSON.parse(movie.genres),
        productionCompanies: JSON.parse(movie.productionCompanies),
        averageRating: averageRating.toFixed(2),
      },
    };
  }

  async getAllMovies(page = 1) {
    const pageSize = 50;
    const offset = (page - 1) * pageSize;
    const movies = await this.moviesRepo.findAllWithPagination(
      offset,
      pageSize,
    );
    const total = await this.moviesRepo.countAll();
    return {
      data: movies.map((m) => ({
        ...m,
        budget: `$${m.budget.toLocaleString()}`,
        genres: JSON.parse(m.genres),
      })),
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getMoviesByYear(year: string, page = 1, order: string = 'asc') {
    const pageSize = 50;
    const movies = await this.moviesRepo.findByYear(year, page, order);
    const total = await this.moviesRepo.countByYear(year);

    return {
      data: movies.map((m) => ({
        ...m,
        budget: `$${m.budget.toLocaleString()}`,
        genres: JSON.parse(m.genres),
      })),
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getMoviesByGenre(genre: string, page = 1) {
    const pageSize = 50;
    const movies = await this.moviesRepo.findByGenre(genre, page);
    const total = await this.moviesRepo.countByGenre(genre);

    return {
      data: movies.map((m) => ({
        ...m,
        budget: `$${m.budget.toLocaleString()}`,
        genres: JSON.parse(m.genres),
      })),
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
