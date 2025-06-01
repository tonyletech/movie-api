import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { RatingsModule } from '../ratings/ratings.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, RatingsModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
