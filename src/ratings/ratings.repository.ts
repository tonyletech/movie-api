import { Injectable } from '@nestjs/common';
import { RatingsDbService } from '../database/ratings-db.service';

@Injectable()
export class RatingsRepository {
  constructor(private readonly db: RatingsDbService) {}
  async getAverageRatingByMovieId(movieId: number): Promise<number> {
    const result = await this.db
      .connection('ratings')
      .where({ movieId })
      .avg('rating as averageRating')
      .first();
    return Number(result?.averageRating || 0);
  }
}
