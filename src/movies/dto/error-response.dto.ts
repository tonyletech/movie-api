import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Movie not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
