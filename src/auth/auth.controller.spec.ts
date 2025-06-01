import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn().mockImplementation((username: string) => ({
        access_token: `mock-token-for-${username}`,
      })),
      validateUser: jest.fn((username: string) => username === 'valid_user'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return JWT token for valid user', async () => {
    const response = await controller.login('valid_user');
    expect(response).toEqual({ access_token: 'mock-token-for-valid_user' });
    expect(authService.login).toHaveBeenCalledWith('valid_user');
  });

  it('should return error for invalid user', async () => {
    const response = await controller.login('invalid_user');
    expect(response).toEqual({ error: 'Invalid user' });
    expect(authService.login).not.toHaveBeenCalledWith('invalid_user');
  });
});
