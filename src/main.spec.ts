import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core');
jest.mock('@nestjs/swagger', () => {
  return {
    SwaggerModule: {
      createDocument: jest.fn(),
      setup: jest.fn(),
    },
    DocumentBuilder: jest.fn(() => ({
      setTitle: jest.fn().mockReturnThis(),
      setDescription: jest.fn().mockReturnThis(),
      setVersion: jest.fn().mockReturnThis(),
      addBearerAuth: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnValue({}),
    })),
    ApiProperty: () => () => {},
    ApiTags: () => () => {},
    ApiOperation: () => () => {},
    ApiQuery: () => () => {},
    ApiResponse: () => () => {},
    ApiBearerAuth: () => () => {},
    ApiBody: () => () => {},
  };
});

describe('Main bootstrap', () => {
  let originalPort: string | undefined;

  beforeEach(() => {
    originalPort = process.env.PORT;
  });

  afterEach(() => {
    process.env.PORT = originalPort;
    jest.clearAllMocks();
  });

  it('should bootstrap and use process.env.PORT if defined', async () => {
    process.env.PORT = '4000';

    const listenMock = jest.fn();
    const useGlobalPipesMock = jest.fn();

    (NestFactory.create as jest.Mock).mockResolvedValue({
      useGlobalPipes: useGlobalPipesMock,
      listen: listenMock,
    });

    const { bootstrap } = await import('./main');
    await bootstrap();

    expect(listenMock).toHaveBeenCalledWith('4000');
  });

  it('should bootstrap and fall back to 3000 if process.env.PORT is undefined', async () => {
    delete process.env.PORT;

    const listenMock = jest.fn();
    const useGlobalPipesMock = jest.fn();

    (NestFactory.create as jest.Mock).mockResolvedValue({
      useGlobalPipes: useGlobalPipesMock,
      listen: listenMock,
    });

    const { bootstrap } = await import('./main');
    await bootstrap();

    expect(listenMock).toHaveBeenCalledWith(3000);
  });
});
