import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from 'mongoose';

export class ListOptions {
  @ApiProperty({
    description: 'Number of items to skip (offset for pagination)',
    type: Number,
    required: false,
    example: 0,
  })
  offset?: number;

  @ApiProperty({
    description: 'Number of items to return (page size)',
    type: Number,
    required: false,
    example: 10,
  })
  size?: number;

  @ApiProperty({
    description:
      'Sort criteria with field names as keys and sort order as values',
    type: Object,
    required: false,
    example: { createdAt: 'asc', name: 'desc' },
  })
  sort?: { [key: string]: SortOrder };
}
