import {Entity, model, property, hasMany} from '@loopback/repository';
import {Book, BookRelations} from './book.model';

@model()
export class Author extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  First_Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Last_Name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Living: boolean;

  @hasMany(() => Book)
  books: Book[];

  constructor(data?: Partial<Author>) {
    super(data);
  }
}

export interface AuthorRelations {
  // describe navigational properties here
  books?: BookRelations[];
}

export type AuthorWithRelations = Author & AuthorRelations;
