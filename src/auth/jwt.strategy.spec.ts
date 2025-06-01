import { JwtStrategy } from './jwt.strategy';
import { ExtractJwt } from 'passport-jwt';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret';
    strategy = new JwtStrategy();
  });

  it('should validate and return user object from payload', async () => {
    const payload = { username: 'john' };
    const result = await strategy.validate(payload);
    expect(result).toEqual({ username: 'john' });
  });

  it('should extract JWT from Authorization header as Bearer token', () => {
    const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const mockRequest = {
      headers: {
        authorization: 'Bearer test_token123',
      },
    };
    expect(jwtExtractor(mockRequest)).toBe('test_token123');
  });
});
