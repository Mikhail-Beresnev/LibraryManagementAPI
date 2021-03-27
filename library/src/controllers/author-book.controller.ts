import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Author,
  Book,
} from '../models';
import {AuthorRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class AuthorBookController {
  constructor(
    @repository(AuthorRepository) protected authorRepository: AuthorRepository,
  ) { }

  @get('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Author has many Book',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Book>,
  ): Promise<Book[]> {
    return this.authorRepository.books(id).find(filter);
  }

  @post('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Author.prototype.Name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInAuthor',
            optional: ['authorId']
          }),
        },
      },
    }) book: Omit<Book, 'Title'>,
  ): Promise<Book> {
    return this.authorRepository.books(id).create(book);
  }

  @del('/authors/{id}/books', {
    responses: {
      '200': {
        description: 'Author.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.authorRepository.books(id).delete(where);
  }
}
