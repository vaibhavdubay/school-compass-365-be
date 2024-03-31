import { Type, UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function FileUpload(type: Type<unknown>, fieldName: string) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName)),
    ApiBody({ type, required: true }),
    ApiConsumes('multipart/form-data'),
  );
}
