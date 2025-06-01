import { MoviesRepository } from './movies.repository';

describe('MoviesRepository', () => {
  let repo: MoviesRepository;
  let mockQueryBuilder: any;

  beforeEach(() => {
    const mockFirstResult = { count: 0 };

    const mockCount = jest.fn().mockReturnThis();
    const mockFirst = jest.fn().mockResolvedValue(mockFirstResult);

    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      whereRaw: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      count: mockCount,
      first: mockFirst,
    };

    const mockDb = {
      connection: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    repo = new MoviesRepository(mockDb as any);
  });

  it('should count all movies', async () => {
    const count = await repo.countAll();
    expect(mockQueryBuilder.count).toHaveBeenCalledWith({ count: '*' });
    expect(count).toBe(0);
  });

  it('should count all movies but not return count field', async () => {
    const mockFirstResult = {};

    const mockCount = jest.fn().mockReturnThis();
    const mockFirst = jest.fn().mockResolvedValue(mockFirstResult);

    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      whereRaw: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      count: mockCount,
      first: mockFirst,
    };

    const mockDb = {
      connection: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    repo = new MoviesRepository(mockDb as any);
    const count = await repo.countAll();
    expect(mockQueryBuilder.count).toHaveBeenCalledWith({ count: '*' });
    expect(count).toBe(0);
  });

  it('should find all with pagination', async () => {
    await repo.findAllWithPagination(0, 50);
    expect(mockQueryBuilder.select).toHaveBeenCalledWith(
      'imdbId',
      'title',
      'genres',
      'releaseDate',
      'budget',
    );
    expect(mockQueryBuilder.offset).toHaveBeenCalledWith(0);
    expect(mockQueryBuilder.limit).toHaveBeenCalledWith(50);
  });

  it('should find movie by ID', async () => {
    await repo.findById(5);
    expect(mockQueryBuilder.where).toHaveBeenCalledWith({ movieId: 5 });
    expect(mockQueryBuilder.first).toHaveBeenCalled();
  });

  it('should find movies by year', async () => {
    await repo.findByYear('1988', 1);
    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      'releaseDate',
      'like',
      '1988%',
    );
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('releaseDate', 'asc');
  });

  it('should find movies by genre', async () => {
    await repo.findByGenre('Drama', 1);
    expect(mockQueryBuilder.whereRaw).toHaveBeenCalledWith(
      'lower(genres) LIKE ?',
      [`%"name": "drama"%`],
    );
  });

  it('should return 0 if count is missing in countByYear', async () => {
    mockQueryBuilder.first = jest.fn().mockResolvedValue({});
    const count = await repo.countByYear('2000');
    expect(count).toBe(0);
  });

  it('should return 0 if count is missing in countByGenre', async () => {
    mockQueryBuilder.first = jest.fn().mockResolvedValue({});
    const count = await repo.countByGenre('Drama');
    expect(count).toBe(0);
  });
});
