import {
  Logger,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { BaseEntity } from './dto/base-entity';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { BaseModelRepository } from './base.repository';
import { plainToInstance } from 'class-transformer';
import { ListOptions } from './dto/list.options';
import { BaseModel } from './dto/base-model';
import { BaseSoftDeleteModel } from './dto/base-soft-delete-model';

export abstract class BaseEntityService<
  E extends BaseEntity,
  M extends BaseModel & Document,
> {
  protected readonly logger = new Logger(`service<${this.constructor.name}>`, {
    timestamp: true,
  });

  constructor(
    protected readonly repository: BaseModelRepository<M>,
    protected entityClass: new () => E,
    protected modelClass: new () => M,
  ) {}

  protected convertToEntity(source: any) {
    if (source instanceof Document) {
      return plainToInstance(
        this.entityClass,
        JSON.parse(JSON.stringify(source)),
      );
    }

    return plainToInstance(this.entityClass, source);
  }

  protected convertToModel(source: any) {
    return plainToInstance(this.modelClass, source);
  }

  protected identify(source: any) {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): source = ${JSON.stringify(source)}`);
    return {
      id: typeof source === 'object' ? source.id : source,
    };
  }

  async add(source: Partial<E>): Promise<E> {
    this.logger.debug(`add(): Enter`);
    this.logger.debug(`add(): args = ${JSON.stringify(source)}`);

    const document = this.convertToModel(source);
    this.logger.debug(`add(): entity = ${JSON.stringify(document)}`);
    const result = await this.repository.create(document);
    this.logger.debug(`add(): result = ${JSON.stringify(result)}`);
    return this.convertToEntity(result);
  }

  async getEntity(source: Partial<E>): Promise<E | undefined> {
    this.logger.debug(`getEntity(): Enter`);
    this.logger.debug(`getEntity(): args = ${JSON.stringify(source)}`);
    const result = await this.getModel(source);
    return result ? this.convertToEntity(result) : undefined;
  }

  async getModel(source: Partial<E>): Promise<M | undefined> {
    this.logger.debug(`getModel(): Enter`);
    this.logger.debug(`getModel(): args = ${JSON.stringify(source)}`);
    const identify = this.identify(source);
    identify['deletedOn'] = { $exists: false };
    const result = await this.repository.find(identify);
    return result ? this.convertToModel(result) : undefined;
  }

  async list(query?: FilterQuery<M>, listOptions?: ListOptions) {
    const filter: FilterQuery<M> = { ...query, deletedOn: { $exists: false } };
    this.logger.debug(`list(): Enter`);
    this.logger.debug(`list(): query = ${JSON.stringify(filter)}`);
    const models = await this.repository.list(filter, listOptions);
    const entities = models.map((model) => this.convertToEntity(model));
    return entities;
  }

  async update(source: Partial<E>, update: UpdateQuery<M>): Promise<E> {
    this.logger.debug(`update(): Enter`);
    this.logger.debug(`update(): args = ${JSON.stringify(source)}`);
    const model = await this.getModel(source);
    this.logger.debug(`update(): model = ${JSON.stringify(model)}`);
    if (!model) {
      throw new NotFoundException(`The entity does not exist in persistence`);
    }
    const result = await this.repository.update(this.identify(source), update);
    return this.convertToEntity(result);
  }

  async remove(source: Partial<E>) {
    this.logger.debug(`remove(): Enter`);
    this.logger.debug(`remove(): args = ${JSON.stringify(source)}`);
    const model = await this.getModel(source);
    if (!model) {
      throw new NotFoundException();
    }
    if (model instanceof BaseSoftDeleteModel) {
      if (Reflect.get(model, 'deletedAt')) {
        throw new MethodNotAllowedException('Document already Deleted');
      }
      const update: UpdateQuery<M> = { $set: { deletedAt: new Date() } };
      await this.repository.update(this.identify(source), update);
    } else {
      await this.repository.delete(this.identify(source));
    }
  }
}
