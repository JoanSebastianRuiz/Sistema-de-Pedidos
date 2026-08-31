import { registerDecorator, ValidationOptions } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsValidPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;

          const phone = parsePhoneNumberFromString(value);

          return phone?.isValid() ?? false;
        },
      },
    });
  };
}
