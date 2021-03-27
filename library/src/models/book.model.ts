import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Author, AuthorRelations} from './author.model';
import {Series, SeriesRelations} from './series.model';

@model()
export class Book extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Title: string;

  @property({
    type: 'string',
    required: true,
  })
  Author: string;

  @property({
    type: 'number',
    required: true,
  })
  ISBN: number;

  @property({
    type: 'number',
    required: true,
  })
  Rating: number;

  @property({
    type: 'boolean',
    required: true,
  })
  Read: boolean;

  @belongsTo(() => Author)
  authorId: string;

  @belongsTo(() => Series)
  seriesId: string;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
  series?: SeriesRelations;
  author?: AuthorRelations;
}

export type BookWithRelations = Book & BookRelations;
