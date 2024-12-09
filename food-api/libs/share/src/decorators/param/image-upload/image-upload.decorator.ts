import { FileTypeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';

export function ImageUpload(): ParameterDecorator {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg)/ }),
      ],
    }),
  );
}
