import { Test, TestingModule } from '@nestjs/testing';
import { MoviesModule } from './movies.module';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';

describe('MoviesModule', () => {
  let service: MoviesService;
  let repository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should define MoviesService', () => {
    expect(service).toBeDefined();
  });

  it('should define MoviesRepository', () => {
    expect(repository).toBeDefined();
  });
});
