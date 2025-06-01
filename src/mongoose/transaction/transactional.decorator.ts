import { TransactionLocalStore } from './transaction-local-store';

export function Transactional() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
      const session = TransactionLocalStore.getSessionIfExist();

      if (session && session.inTransaction()) {
        // Join existing transaction
        console.debug(`Joining existing transaction for ${propertyKey}`);
        return await originalMethod.apply(this, args);
      }

      // Start new transaction
      console.debug(`Starting new transaction for ${propertyKey}`);
      await TransactionLocalStore.startSession();
      const newSession = TransactionLocalStore.getSessionIfExist();

      if (!newSession) {
        throw new Error('Failed to start session in TransactionLocalStore');
      }

      let result: any;
      try {
        await newSession.withTransaction(async () => {
          result = await originalMethod.apply(this, args);
        });
        await TransactionLocalStore.commitTransactionIfExist();
        console.debug(`Transaction committed for ${propertyKey}`);
        return result;
      } catch (error) {
        console.debug(`Transaction failed for ${propertyKey}:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}
