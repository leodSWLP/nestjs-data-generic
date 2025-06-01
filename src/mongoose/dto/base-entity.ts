import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @ApiProperty({
    name: 'id',
    description: 'the id of the entity',
    type: 'string',
    readOnly: true,
    example: uuid(),
  })
  id: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Date when entity is first created',
    type: 'string',
    example: '2025-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdAt?: Date;

  @ApiProperty({
    name: 'lastUpdatedAt',
    description: 'Date when entity is last changed',
    type: 'string',
    example: '2025-01-01T00:00:00.000Z',
    readOnly: true,
  })
  lastUpdatedAt?: Date;
}
