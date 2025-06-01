import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { RatingsService } from '../ratings/ratings.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepo: jest.Mocked<MoviesRepository>;
  let ratingsService: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: {
            findById: jest.fn(),
            findAllWithPagination: jest.fn(),
            countAll: jest.fn(),
            findByYear: jest.fn(),
            findByGenre: jest.fn(),
            countByYear: jest.fn(),
            countByGenre: jest.fn(),
          },
        },
        {
          provide: RatingsService,
          useValue: {
            getAverage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepo = module.get<MoviesRepository>(
      MoviesRepository,
    ) as jest.Mocked<MoviesRepository>;
    ratingsService = module.get<RatingsService>(RatingsService);
  });

  describe('getMovieById', () => {
    it('should return null if movie not found', async () => {
      jest.spyOn(moviesRepo, 'findById').mockResolvedValue(null);

      const result = await service.getMovieById(1);
      expect(result).toBeNull();
    });

    it('should return movie details with average rating', async () => {
      const mockMovie = {
        movieId: 1,
        imdbId: 'tt1234567',
        title: 'Test Movie',
        budget: 1000000,
        genres: JSON.stringify([{ id: 1, name: 'Drama' }]),
        productionCompanies: JSON.stringify([{ id: 1, name: 'Studio A' }]),
      };

      jest.spyOn(moviesRepo, 'findById').mockResolvedValue(mockMovie as any);
      jest.spyOn(ratingsService, 'getAverage').mockResolvedValue(4.25);

      const result = await service.getMovieById(1);
      expect(result).not.toBeNull();
      expect(result!.data.title).toBe('Test Movie');
      expect(result!.data.averageRating).toBe('4.25');
      expect(result!.data.genres).toEqual([{ id: 1, name: 'Drama' }]);
    });
  });

  describe('getAllMovies', () => {
    it('should return paginated movie list', async () => {
      const mockMovies = [
        {
          imdbId: 'tt123',
          title: 'Movie A',
          genres: JSON.stringify([{ id: 1, name: 'Action' }]),
          releaseDate: '2020-01-01',
          budget: 5000000,
        },
      ];

      jest
        .spyOn(moviesRepo, 'findAllWithPagination')
        .mockResolvedValue(mockMovies as any);
      jest.spyOn(moviesRepo, 'countAll').mockResolvedValue(1);

      const result = await service.getAllMovies();
      expect(result.data.length).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.total).toBe(1);
      expect(result.data[0].genres).toEqual([{ id: 1, name: 'Action' }]);
    });
  });

  describe('getMoviesByYear', () => {
    it('should return movies with metadata by year', async () => {
      const year = '2023';
      const mockMovies = [
        {
          imdbId: 'tt888',
          title: 'Movie A',
          budget: 1000000,
          genres: '["Action", "Drama"]',
          releaseDate: '2023-05-01',
        },
      ];

      moviesRepo.findByYear.mockResolvedValue(mockMovies);
      moviesRepo.countByYear.mockResolvedValue(1);

      const result = await service.getMoviesByYear(year);

      expect(result.data[0].budget).toBe('$1,000,000');
      expect(result.data[0].genres).toEqual(['Action', 'Drama']);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.pageSize).toBe(50);
      expect(result.meta.totalPages).toBe(1);
    });
  });

  describe('getMoviesByGenre', () => {
    it('should return movies with metadata by genre', async () => {
      const genre = 'Comedy';
      const mockMovies = [
        {
          imdbId: 'tt999',
          title: 'Funny Movie',
          budget: 500000,
          genres: '["Comedy"]',
          releaseDate: '2024-01-01',
        },
      ];

      moviesRepo.findByGenre.mockResolvedValue(mockMovies);
      moviesRepo.countByGenre.mockResolvedValue(1);

      const result = await service.getMoviesByGenre(genre);

      expect(result.data[0].budget).toBe('$500,000');
      expect(result.data[0].genres).toEqual(['Comedy']);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.pageSize).toBe(50);
      expect(result.meta.totalPages).toBe(1);
    });
  });
});
