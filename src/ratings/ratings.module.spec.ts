import { Test, TestingModule } from '@nestjs/testing';
import { RatingsModule } from './ratings.module';
import { RatingsService } from './ratings.service';
import { RatingsRepository } from './ratings.repository';

describe('RatingsModule', () => {
  let service: RatingsService;
  let repository: RatingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RatingsModule],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
    repository = module.get<RatingsRepository>(RatingsRepository);
  });

  it('should define RatingsService', () => {
    expect(service).toBeDefined();
  });

  it('should define RatingsRepository', () => {
    expect(repository).toBeDefined();
  });
});
