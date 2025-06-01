import { RequestIdMiddleware } from './request-id.middleware';
import { Request, Response, NextFunction } from 'express';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-request-id'),
}));

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    middleware = new RequestIdMiddleware();

    req = {
      headers: {},
    };

    res = {
      setHeader: jest.fn(),
    };

    next = jest.fn();
  });

  it('should generate and attach request ID to headers and response', () => {
    middleware.use(req as Request, res as Response, next);

    expect(req.headers && req.headers['x-request-id']).toBe('mock-request-id');
    expect(res.setHeader).toHaveBeenCalledWith(
      'X-Request-Id',
      'mock-request-id',
    );
    expect(next).toHaveBeenCalled();
  });
});
