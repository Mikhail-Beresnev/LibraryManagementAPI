import {Entity, model, property, hasMany} from '@loopback/repository';
import {Book, BookRelations} from './book.model';

@model()
export class Series extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Finished: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  Complete: boolean;

  @hasMany(() => Book)
  books: Book[];

  constructor(data?: Partial<Series>) {
    super(data);
  }
}

export interface SeriesRelations {
  // describe navigational properties here
  books?: BookRelations[];
}

export type SeriesWithRelations = Series & SeriesRelations;
