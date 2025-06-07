import { Prop } from '@nestjs/mongoose';
import { BaseModel, createBaseSchema } from './base-model';

export abstract class BaseSoftDeleteModel extends BaseModel {
  @Prop({
    required: false,
  })
  deletedAt: Date;
}

export const createBaseIndestructibleSchema = createBaseSchema;
