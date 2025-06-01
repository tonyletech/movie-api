import { RatingsDbService } from './ratings-db.service';

describe('RatingsDbService', () => {
  let service: RatingsDbService;

  beforeEach(() => {
    service = new RatingsDbService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a knex instance', () => {
    const connection = service.connection;
    expect(connection).toBeDefined();
    expect(typeof connection).toBe('function');
    expect(Object.keys(connection)).toContain('select');
  });

  afterAll(async () => {
    await service.connection.destroy();
  });
});
