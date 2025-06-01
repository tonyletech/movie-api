import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import * as path from 'path';

@Injectable()
export class RatingsDbService {
  private readonly db: Knex;
  constructor() {
    this.db = knex({
      client: 'sqlite3',
      connection: {
        filename:
          process.env.RATINGS_DB_PATH ||
          path.join(__dirname, '../../db/ratings.db'),
      },
      useNullAsDefault: true,
    });
  }
  get connection(): Knex {
    return this.db;
  }
}
