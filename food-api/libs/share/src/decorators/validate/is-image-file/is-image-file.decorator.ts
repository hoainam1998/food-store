import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsImageFile(
  pattern: RegExp,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isImageFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [pattern],
      options: validationOptions,
      validator: {
        validate(value: Express.Multer.File) {
          return pattern.test(value.mimetype);
        },
      },
    });
  };
}
