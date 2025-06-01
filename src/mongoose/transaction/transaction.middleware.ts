import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { TransactionLocalStore } from './transaction-local-store';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private connection: Connection) {}

  use(req: any, res: any, next: () => void) {
    TransactionLocalStore.initAsyncLocalStore(() => {
      TransactionLocalStore.setConnection(this.connection);
      next();
    });
  }
}
