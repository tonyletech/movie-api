import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryMoviesDto } from './dto/query-movies.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getAllMovies: jest.fn().mockResolvedValue({ data: [], meta: {} }),
            getMovieById: jest.fn().mockResolvedValue(null),
            getMoviesByYear: jest.fn().mockResolvedValue([]),
            getMoviesByGenre: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should return movie list', async () => {
    const query = { page: '1' };
    const dto = plainToInstance(QueryMoviesDto, query);
    const result = await controller.getAllMovies(dto);
    expect(result).toEqual({ data: [], meta: {} });
    expect(service.getAllMovies).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if movie not found', async () => {
    await expect(controller.getMovieById(1)).rejects.toThrow(NotFoundException);
    await expect(controller.getMovieById(1)).rejects.toThrow('Movie not found');
  });

  it('should return movie detail if found', async () => {
    const mockMovie = { data: { id: 1, title: 'Test Movie' } };
    jest.spyOn(service, 'getMovieById').mockResolvedValue(mockMovie);

    const result = await controller.getMovieById(1);
    expect(result).toEqual(mockMovie);
  });

  it('should return movies by year', async () => {
    const result = await controller.getByYear('2023', {
      page: 2,
      order: 'desc',
    });
    expect(result).toEqual([]);
    expect(service.getMoviesByYear).toHaveBeenCalledWith('2023', 2, 'desc');
  });

  it('should return movies by genre', async () => {
    const result = await controller.getByGenre('Drama', { page: 1 });
    expect(result).toEqual([]);
    expect(service.getMoviesByGenre).toHaveBeenCalledWith('Drama', 1);
  });
});
