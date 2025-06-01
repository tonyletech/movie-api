import { Injectable } from '@nestjs/common';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  getAverage(movieId: number): Promise<number> {
    return this.ratingsRepository.getAverageRatingByMovieId(movieId);
  }
}
