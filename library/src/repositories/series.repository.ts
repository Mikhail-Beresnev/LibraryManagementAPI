import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Series, SeriesRelations, Book} from '../models';
import {BookRepository} from './book.repository';

export class SeriesRepository extends DefaultCrudRepository<
  Series,
  typeof Series.prototype.Name,
  SeriesRelations
> {

  public readonly books: HasManyRepositoryFactory<Book, typeof Series.prototype.Name>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(Series, dataSource);
    this.books = this.createHasManyRepositoryFactoryFor('books', bookRepositoryGetter,);
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
