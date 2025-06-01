import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { QueryMoviesDto } from './dto/query-movies.dto';
import {
  MovieDetailResponseDto,
  MovieResponseDto,
} from './dto/movie-response.dto';
import { ErrorResponseDto } from './dto/error-response.dto';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'List all movies (paginated)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, type: [MovieResponseDto] })
  getAllMovies(@Query() query: QueryMoviesDto) {
    return this.moviesService.getAllMovies(query.page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie details by ID' })
  @ApiResponse({ status: 200, type: MovieDetailResponseDto })
  @ApiResponse({ status: 404, type: ErrorResponseDto })
  async getMovieById(@Param('id') id: number) {
    const movie = await this.moviesService.getMovieById(id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/year/:year')
  @ApiOperation({ summary: 'Get movies by year (paginated & sortable)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiResponse({ status: 200, type: [MovieResponseDto] })
  async getByYear(@Param('year') year: string, @Query() query: QueryMoviesDto) {
    return this.moviesService.getMoviesByYear(year, query.page, query.order);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/genre/:genre')
  @ApiOperation({ summary: 'Get movies by genre (paginated)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, type: [MovieResponseDto] })
  async getByGenre(
    @Param('genre') genre: string,
    @Query() query: QueryMoviesDto,
  ) {
    return this.moviesService.getMoviesByGenre(genre, query.page);
  }
}
