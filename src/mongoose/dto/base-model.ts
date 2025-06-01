import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id; // Remove _id from output
    },
  },
})
export class BaseModel {
  @Prop({
    index: true,
    immutable: true,
    default: () => uuid(),
  })
  id: string;

  @Prop({
    immutable: true,
    default: () => new Date(),
  })
  createdAt: Date;

  @Prop({
    default: () => new Date(),
  })
  lastUpdatedOn: Date;
}

export function createBaseSchema<T extends typeof BaseModel>(
  targetClass: T,
): MongooseSchema {
  const schema = SchemaFactory.createForClass(targetClass);

  schema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function (next) {
    this.set({ lastUpdatedAt: new Date() });
    next();
  });

  return schema;
}
