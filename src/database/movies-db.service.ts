import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import * as path from 'path';

@Injectable()
export class MoviesDbService {
  private readonly db: Knex;
  constructor() {
    this.db = knex({
      client: 'sqlite3',
      connection: {
        filename:
          process.env.MOVIES_DB_PATH1 ||
          path.join(__dirname, '../../db/movies.db'),
      },
      useNullAsDefault: true,
    });
  }
  get connection(): Knex {
    return this.db;
  }
}
