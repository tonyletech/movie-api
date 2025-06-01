import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  describe('handleRequest', () => {
    it('should return the user if no error and user exists', () => {
      const mockUser = { username: 'test_user' };
      const result = guard.handleRequest(null, mockUser, null);
      expect(result).toBe(mockUser);
    });

    it('should throw UnauthorizedException if user is missing', () => {
      expect(() => guard.handleRequest(null, null, null)).toThrow(
        new UnauthorizedException('Invalid or missing token'),
      );
    });

    it('should rethrow the error if provided', () => {
      const error = new Error('Some other error');
      expect(() => guard.handleRequest(error, null, null)).toThrow(error);
    });
  });
});
