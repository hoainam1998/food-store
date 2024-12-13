import { FileTypeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';

class FileMimeTypeChecker extends FileTypeValidator {
  buildErrorMessage(): string {
    return 'File is not image';
  }
}

export function ImageUpload(): ParameterDecorator {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileMimeTypeChecker({
          fileType: /image\/(jpeg|png|jpg)/,
        }),
      ],
    }),
  );
}
