import { LoggingMiddleware } from './logging.middleware';

describe('LoggingMiddleware', () => {
  let middleware: LoggingMiddleware;
  const mockLogger = {
    log: jest.fn(),
  };

  beforeEach(() => {
    middleware = new LoggingMiddleware();
    (middleware as any).logger = mockLogger;
  });

  it('should log the request with x-request-id', () => {
    const req: any = {
      method: 'GET',
      originalUrl: '/movies',
      headers: {
        'x-request-id': 'abc-123',
      },
    };

    const res: any = {
      statusCode: 200,
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    };

    const next = jest.fn();

    middleware.use(req, res, next);

    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(mockLogger.log).toHaveBeenCalledWith('[abc-123] GET /movies 200');
    expect(next).toHaveBeenCalled();
  });

  it('should log even if x-request-id is missing', () => {
    const req: any = {
      method: 'POST',
      originalUrl: '/auth/login',
      headers: {},
    };

    const res: any = {
      statusCode: 401,
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    };

    const next = jest.fn();

    middleware.use(req, res, next);

    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(mockLogger.log).toHaveBeenCalledWith(
      '[undefined] POST /auth/login 401',
    );
    expect(next).toHaveBeenCalled();
  });
});
