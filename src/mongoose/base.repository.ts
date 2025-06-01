import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseModel } from './dto/base-model';
import { Document, FilterQuery, Model, SortOrder, UpdateQuery } from 'mongoose';
import { TransactionLocalStore } from './transaction/transaction-local-store';
import { plainToInstance } from 'class-transformer';

@Injectable()
export abstract class BaseModelRepository<T extends BaseModel & Document> {
  protected readonly logger = new Logger(
    `repository<${this.constructor.name}>`,
    { timestamp: true },
  );

  constructor(
    protected readonly model: Model<T>,
    protected readonly modelClass: new () => T, // Class constructor for T
  ) {}

  /**
   * @protected
   * @async
   * @method bundle
   * @description Pre-processes the document data before passing it to {@link create}. Sub-repositories can override this method to implement custom data transformation or validation logic.
   * @param {any} source - the arguments to be passed from {@link create}
   * @returns - the transformed data to be used for document creation
   */
  protected bundle(source: any): T | Promise<T> {
    this.logger.debug(
      `bundle(): Transforming source = ${JSON.stringify(source)}`,
    );
    return plainToInstance(this.modelClass, source);
  }

  /**
   * @protected
   * @method identify
   * @description Parses a partial model to generate an identity query for {@link findById}, {@link updateById}, and {@link deleteById}. Sub-repositories can override this method to customize how the identity query is constructed.
   * @param {Partial<T>} model - The partial model containing the identity information
   * @returns {any} - the query to identify the entity
   */
  protected identify(model: Partial<T>): FilterQuery<T> {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): model = ${JSON.stringify(model)}`);

    if (!model.id) {
      throw new InternalServerErrorException(
        'Unable to get the identify from model',
      );
    }
    return { id: model.id, deletedAt: { $exists: false } };
  }

  async findById(model: Partial<T>): Promise<T | null> {
    this.logger.debug(`findById(): Enter`);
    const query = this.identify(model);
    return await this.find(query);
  }

  async deleteById(model: Partial<T>): Promise<T | null> {
    this.logger.debug(`deleteById(): Enter`);
    const query = this.identify(model);
    return await this.deleteById(query);
  }

  async updateById(
    model: Partial<T>,
    mutation: UpdateQuery<T>,
  ): Promise<T | null> {
    this.logger.debug(`updateById(): Enter`);
    const query = this.identify(model);
    return await this.update(query, mutation);
  }

  async create(source: Partial<T>): Promise<T> {
    this.logger.debug(`create(): Enter`);
    this.logger.debug(`create(): args = ${JSON.stringify(source)}`);

    const documentToInsert = await this.bundle(source);
    this.logger.debug(
      `create(): document = ${JSON.stringify(documentToInsert)}`,
    );

    const session = TransactionLocalStore.getSessionIfExist();
    const document = new this.model(documentToInsert);
    return await document.save({ session });
  }

  async find(query: FilterQuery<T>): Promise<T | null> {
    this.logger.debug(`findOne(): Enter`);
    this.logger.debug(`findOne(): args = ${JSON.stringify(query)}`);

    const session = TransactionLocalStore.getSessionIfExist();
    const document = await this.model.findOne(query).session(session).exec();
    return document;
  }

  async list(
    query: FilterQuery<T>,
    listOptions?: {
      offset?: number;
      size?: number;
      sort?: { [key: string]: SortOrder };
    },
  ): Promise<T[]> {
    this.logger.debug(`list(): Enter`);
    this.logger.debug(`list(): query = ${JSON.stringify(query)}`);
    this.logger.debug(`list(): listOptions = ${JSON.stringify(listOptions)}`);

    const session = TransactionLocalStore.getSessionIfExist();
    let listQuery = this.model.find(query);

    if (listOptions?.sort) {
      listQuery.sort(listOptions.sort);
    }

    if (
      typeof listOptions?.offset === 'number' &&
      typeof listOptions?.size === 'number'
    ) {
      listQuery = listQuery
        .skip(listOptions.size * listOptions.offset)
        .limit(listOptions.size);
    }
    return await listQuery.session(session).exec();
  }

  async update(
    query: FilterQuery<T>,
    mutation: UpdateQuery<T>,
  ): Promise<T | null> {
    this.logger.debug(`update(): Enter`);
    this.logger.debug(`update(): query = ${JSON.stringify(query)}`);
    this.logger.debug(`update(): mutation = ${JSON.stringify(mutation)}`);

    const session = TransactionLocalStore.getSessionIfExist();
    const document = await this.model
      .findOneAndUpdate(query, mutation, {
        new: true,
      })
      .session(session)
      .exec();
    return document;
  }

  async delete(query: FilterQuery<T>): Promise<T | null> {
    this.logger.debug(`delete(): Enter`);
    this.logger.debug(`delete(): query = ${JSON.stringify(query)}`);

    const session = TransactionLocalStore.getSessionIfExist();
    const document = await this.model
      .findOneAndDelete(query)
      .session(session)
      .exec();
    return document;
  }
}
