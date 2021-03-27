import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Series} from '../models';
import {SeriesRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class SeriesController {
  constructor(
    @repository(SeriesRepository)
    public seriesRepository : SeriesRepository,
  ) {}

  @post('/series')
  @response(200, {
    description: 'Series model instance',
    content: {'application/json': {schema: getModelSchemaRef(Series)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Series, {
            title: 'NewSeries'
          }),
        },
      },
    })
    series: Omit<Series, 'Name'>,
  ): Promise<Series> {
    return this.seriesRepository.create(series);
  }

  @get('/series')
  @response(200, {
    description: 'Array of Series model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Series, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Series) filter?: Filter<Series>,
  ): Promise<Series[]> {
    return this.seriesRepository.find(filter);
  }

  @get('/series/{id}')
  @response(200, {
    description: 'Series model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Series, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Series, {exclude: 'where'}) filter?: FilterExcludingWhere<Series>
  ): Promise<Series> {
    return this.seriesRepository.findById(id, filter);
  }

  @del('/series/{id}')
  @response(204, {
    description: 'Series DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.seriesRepository.deleteById(id);
  }
}
