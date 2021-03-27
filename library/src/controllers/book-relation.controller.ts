import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Book,
  Author,
  Series,
} from '../models';
import {BookRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class BookRelationController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/author', {
    responses: {
      '200': {
        description: 'Author belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Author)},
          },
        },
      },
    },
  })
  async getAuthor(
    @param.path.string('id') id: typeof Book.prototype.Title,
  ): Promise<Author> {
    return this.bookRepository.author(id);
  }

  @get('/books/{id}/series', {
    responses: {
      '200': {
        description: 'Series belonging to Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Series)},
          },
        },
      },
    },
  })
  async getSeries(
    @param.path.string('id') id: typeof Book.prototype.Title,
  ): Promise<Series> {
    return this.bookRepository.series(id);
  }
}
