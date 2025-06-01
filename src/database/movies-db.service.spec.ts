import { MoviesDbService } from './movies-db.service';

describe('MoviesDbService', () => {
  let service: MoviesDbService;

  beforeEach(() => {
    service = new MoviesDbService();
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
