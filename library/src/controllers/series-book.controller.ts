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
  Series,
  Book,
} from '../models';
import {SeriesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class SeriesBookController {
  constructor(
    @repository(SeriesRepository) protected seriesRepository: SeriesRepository,
  ) { }

  @get('/series/{id}/books', {
    responses: {
      '200': {
        description: 'Array of Series has many Book',
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
    return this.seriesRepository.books(id).find(filter);
  }

  @post('/series/{id}/books', {
    responses: {
      '200': {
        description: 'Series model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Series.prototype.Name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInSeries',
            optional: ['seriesId']
          }),
        },
      },
    }) book: Omit<Book, 'Title'>,
  ): Promise<Book> {
    return this.seriesRepository.books(id).create(book);
  }

  @del('/series/{id}/books', {
    responses: {
      '200': {
        description: 'Series.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.seriesRepository.books(id).delete(where);
  }
}
