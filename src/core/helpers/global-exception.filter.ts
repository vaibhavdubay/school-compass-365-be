import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { statusCode, message } = this.handleException(exception);
    const response = host.switchToHttp().getResponse();
    const status =
      statusCode || (exception.getStatus ? exception.getStatus() : 500);

    response.status(status).json({
      statusCode: status,
      message: message || exception.message || 'Internal Server Error',
    });
  }

  handleException(error) {
    if (error.code === 11000) {
      return this.handleDuplicateKeyError(error);
    } else if (error.name === 'ValidationError') {
      return this.handleValidationError(error);
    } else if (error.response?.statusCode === 400) {
      return this.handleExternalValidationError(error.response.message);
    } else if (error.name === 'Caste') {
      return { statusCode: 400, message: error.message };
    } else {
      return { statusCode: 0, message: '' };
    }
  }

  private handleDuplicateKeyError(error) {
    const message = `Duplicate records: ${Object.entries(error.keyValue)
      .map((ob) => `[${ob[0]} - ${ob[1]}]`)
      .join(', ')} already exist`;
    return { statusCode: 400, message };
  }

  private handleValidationError(error) {
    const message = Object.keys(error.errors).map((field) => {
      const errorMsg = error.errors[field].message;
      return errorMsg.startsWith('Cast to ObjectId failed')
        ? `${field} is not a valid ObjectId`
        : errorMsg;
    });
    return { statusCode: 400, message };
  }

  private handleExternalValidationError(messages: string[]) {
    const emptyFields: string[] =
      messages
        ?.filter((message) => message.split(' should not be empty').length > 1)
        .map((message) => message.split('should not be empty')[0]) || [];

    const message = messages.filter((message) =>
      emptyFields.length
        ? emptyFields.some((field) =>
            message.startsWith(field)
              ? message.includes(' should not be empty')
              : true,
          )
        : true,
    );

    return { statusCode: 400, message };
  }
}
