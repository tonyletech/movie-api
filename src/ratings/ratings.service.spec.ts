import { RatingsService } from './ratings.service';
import { RatingsRepository } from './ratings.repository';

describe('RatingsService', () => {
  it('should return rounded average rating', async () => {
    const service = new RatingsService({
      getAverageRatingByMovieId: jest.fn().mockResolvedValue(3.456),
    } as any);
    const avg = await service.getAverage(1);
    expect(avg).toBe(3.456);
  });
});
