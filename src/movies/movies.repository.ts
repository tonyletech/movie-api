import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { MoviesDbService } from '../database/movies-db.service';

@Injectable()
export class MoviesRepository {
  constructor(@Inject(MoviesDbService) private readonly db: MoviesDbService) {}

  async findAllWithPagination(offset: number, limit: number) {
    return this.db
      .connection('movies')
      .select('imdbId', 'title', 'genres', 'releaseDate', 'budget')
      .offset(offset)
      .limit(limit);
  }

  async countAll() {
    const result = await this.db
      .connection('movies')
      .count({ count: '*' })
      .first();
    return Number(result?.count ?? 0);
  }

  async findById(id: number) {
    return this.db.connection('movies').where({ movieId: id }).first();
  }

  async findByYear(year: string, page: number, order: string = 'asc') {
    const pageSize = 50;
    const offset = (page - 1) * pageSize;
    return this.db
      .connection('movies')
      .where('releaseDate', 'like', `${year}%`)
      .orderBy('releaseDate', order)
      .offset(offset)
      .limit(pageSize)
      .select('imdbId', 'title', 'genres', 'releaseDate', 'budget');
  }

  async findByGenre(genre: string, page: number) {
    const pageSize = 50;
    const offset = (page - 1) * pageSize;
    return this.db
      .connection('movies')
      .whereRaw('lower(genres) LIKE ?', [`%"name": "${genre.toLowerCase()}"%`])
      .offset(offset)
      .limit(pageSize)
      .select('imdbId', 'title', 'genres', 'releaseDate', 'budget');
  }

  async countByYear(year: string): Promise<number> {
    const result = await this.db
      .connection('movies')
      .where('releaseDate', 'like', `${year}%`)
      .count({ count: '*' })
      .first();
    return Number(result?.count ?? 0);
  }

  async countByGenre(genre: string): Promise<number> {
    const result = await this.db
      .connection('movies')
      .whereRaw('lower(genres) LIKE ?', [`%"name": "${genre.toLowerCase()}"%`])
      .count({ count: '*' })
      .first();
    return Number(result?.count ?? 0);
  }
}
