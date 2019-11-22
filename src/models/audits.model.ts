import { Entity, model, property } from '@loopback/repository';
const uuidv4 = require('uuid/v4');

@model({ settings: { strict: false } })
export class Audits extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4' //alphanumeric id generator
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  actionName: string;

  @property({
    type: 'string',
    required: true,
  })
  actionDescription: string;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: Date;

  @property({
    type: 'string',
    required: true,
  })
  moduleName: string;

  @property({
    type: 'string',
    required: true,
  })
  projectName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Audits>) {
    super(data);
  }
}

export interface AuditsRelations {
  // describe navigational properties here
}

export type AuditsWithRelations = Audits & AuditsRelations;
