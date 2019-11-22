import {DefaultCrudRepository} from '@loopback/repository';
import {Audits, AuditsRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AuditsRepository extends DefaultCrudRepository<
  Audits,
  typeof Audits.prototype.id,
  AuditsRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Audits, dataSource);
  }
}
