import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty() imdbId: string;
  @ApiProperty() title: string;
  @ApiProperty({
    type: [Object],
    description: 'Array of genre objects',
  })
  genres: any[];
  @ApiProperty() releaseDate: string;
  @ApiProperty() budget: string;
}

export class MovieDetailResponseDto extends MovieResponseDto {
  @ApiProperty() overview: string;
  @ApiProperty() runtime: number;
  @ApiProperty() averageRating: string;
  @ApiProperty() language: string;
  @ApiProperty({
    type: [Object],
    description: 'Array of production company objects',
  })
  productionCompanies: any[];
}
