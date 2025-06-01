import { RatingsRepository } from './ratings.repository';
import { RatingsDbService } from '../database/ratings-db.service';

describe('RatingsRepository', () => {
  it('should return average rating', async () => {
    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      avg: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue({ averageRating: 3.5 }),
    };

    const mockDb = {
      connection: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const repo = new RatingsRepository(mockDb as any);
    const avg = await repo.getAverageRatingByMovieId(1);
    expect(avg).toBe(3.5);
  });

  it('should return average rating 0', async () => {
    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      avg: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue({}),
    };

    const mockDb = {
      connection: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const repo = new RatingsRepository(mockDb as any);
    const avg = await repo.getAverageRatingByMovieId(1);
    expect(avg).toBe(0);
  });
});
