import { Module } from '@nestjs/common';
import { MoviesDbService } from './movies-db.service';
import { RatingsDbService } from './ratings-db.service';

@Module({
  providers: [MoviesDbService, RatingsDbService],
  exports: [MoviesDbService, RatingsDbService],
})
export class DatabaseModule {}
