import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked.jwt.token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await service.login('john');
      expect(result).toEqual({ access_token: 'mocked.jwt.token' });
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'john' });
    });
  });

  describe('validateUser', () => {
    it('should return true if username matches env', () => {
      process.env.USERNAME = 'admin';
      expect(service.validateUser('admin')).toBe(true);
    });

    it('should return false if username does not match env', () => {
      process.env.USERNAME = 'admin';
      expect(service.validateUser('user')).toBe(false);
    });
  });
});
