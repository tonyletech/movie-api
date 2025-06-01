import { Module } from '@nestjs/common';
import { RatingsRepository } from './ratings.repository';
import { RatingsService } from './ratings.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RatingsRepository, RatingsService],
  exports: [RatingsRepository, RatingsService],
})
export class RatingsModule {}
