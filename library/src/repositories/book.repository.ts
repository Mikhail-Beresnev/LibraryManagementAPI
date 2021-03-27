import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Book, BookRelations, Author, Series} from '../models';
import {AuthorRepository} from './author.repository';
import {SeriesRepository} from './series.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.Title,
  BookRelations
> {

  public readonly author: BelongsToAccessor<Author, typeof Book.prototype.Title>;

  public readonly series: BelongsToAccessor<Series, typeof Book.prototype.Title>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AuthorRepository') protected authorRepositoryGetter: Getter<AuthorRepository>, @repository.getter('SeriesRepository') protected seriesRepositoryGetter: Getter<SeriesRepository>,
  ) {
    super(Book, dataSource);
    this.series = this.createBelongsToAccessorFor('series', seriesRepositoryGetter,);
    this.registerInclusionResolver('series', this.series.inclusionResolver);
    this.author = this.createBelongsToAccessorFor('author', authorRepositoryGetter,);
    this.registerInclusionResolver('author', this.author.inclusionResolver);
  }
}
