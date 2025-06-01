import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: mongoose.mongo.MongoServerError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    let mongoError;
    switch (exception.code) {
      case 11000: {
        mongoError = {
          statusCode: HttpStatus.CONFLICT,
          // message: 'Entity already defined.',
          message: exception.message,
        };
        break;
      }
      default: {
        mongoError = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        };
      }
    }

    response.status(mongoError.statusCode).json(mongoError);
  }
}
