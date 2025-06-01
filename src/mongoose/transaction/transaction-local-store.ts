import { AsyncLocalStorage } from 'async_hooks';
import { ClientSession, Connection } from 'mongoose';

export class TransactionStore {
  connection?: Connection;
  session?: ClientSession;
}

export class TransactionLocalStore {
  public static asyncLocalStore = new AsyncLocalStorage<TransactionStore>();

  static initAsyncLocalStore(initSetValueFn: () => void) {
    this.asyncLocalStore.run(new TransactionStore(), initSetValueFn);
  }

  private static getStore(): TransactionStore {
    const store = this.asyncLocalStore.getStore();
    if (!store) {
      throw new Error('Please Transaction Local Store first');
    }
    return store;
  }

  static setConnection(connection: Connection) {
    this.getStore().connection = connection;
  }

  static getConnection() {
    return this.getStore().connection;
  }

  static async startSession() {
    const connection = this.getStore().connection;
    if (!connection) {
      throw new Error('Please set Connection before start Session');
    }

    const session = await connection.startSession();
    this.getStore().session = session;
  }

  static getSessionIfExist() {
    const store = this.asyncLocalStore.getStore();
    if (!store) {
      return null;
    }
    return store.session ?? null;
  }

  static async commitTransactionIfExist() {
    const session = this.getStore().session;
    if (session) {
      await session.commitTransaction();
      await session.endSession();
    }
  }

  static async abortTransactionIfExist() {
    const session = this.getStore().session;
    if (session) {
      await session.abortTransaction();
      await session.endSession();
    }
  }
}
