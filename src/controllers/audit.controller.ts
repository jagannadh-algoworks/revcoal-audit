import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Audits } from '../models';
import { AuditsRepository } from '../repositories';

export class AuditController {
  constructor(
    @repository(AuditsRepository)
    public auditsRepository: AuditsRepository,
  ) { }

  @post('/audits', {
    responses: {
      '200': {
        description: 'Audits model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Audits) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Audits, {
            title: 'NewAudits',
            exclude: ['id', 'createdOn'],
          }),
        },
      },
    })
    audits: Omit<Audits, 'id'>,
  ): Promise<Audits> {
    return this.auditsRepository.create({ ...audits });
  }

  @get('/audits/count', {
    responses: {
      '200': {
        description: 'Audits model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Audits)) where?: Where<Audits>,
  ): Promise<Count> {
    return this.auditsRepository.count(where);
  }

  @get('/audits', {
    responses: {
      '200': {
        description: 'Array of Audits model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Audits) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Audits)) filter?: Filter<Audits>,
  ): Promise<Audits[]> {
    return this.auditsRepository.find(filter);
  }

  @patch('/audits', {
    responses: {
      '200': {
        description: 'Audits PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Audits, {
            partial: true,
            exclude: ['id', 'createdOn']
          }),
        },
      },
    })
    audits: Audits,
    @param.query.object('where', getWhereSchemaFor(Audits)) where?: Where<Audits>,
  ): Promise<Count> {
    return this.auditsRepository.updateAll(audits, where);
  }

  @get('/audits/{id}', {
    responses: {
      '200': {
        description: 'Audits model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Audits) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Audits> {
    return this.auditsRepository.findById(id);
  }

  @patch('/audits/{id}', {
    responses: {
      '204': {
        description: 'Audits PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Audits,
            {
              partial: true,
              exclude: ['id', 'createdOn']
            }),
        },
      },
    })
    audits: Audits,
  ): Promise<void> {
    await this.auditsRepository.updateById(id, audits);
  }

  @put('/audits/{id}', {
    responses: {
      '204': {
        description: 'Audits PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() audits: Audits,
  ): Promise<void> {
    await this.auditsRepository.replaceById(id, audits);
  }

  @del('/audits/{id}', {
    responses: {
      '204': {
        description: 'Audits DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.auditsRepository.deleteById(id);
  }
}
