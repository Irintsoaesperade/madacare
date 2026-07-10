import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotFutureDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true; // champ optionnel, on ne bloque pas si vide
          const dateSaisie = new Date(value);
          return dateSaisie <= new Date();
        },
        defaultMessage() {
          return 'La date de naissance ne peut pas être dans le futur';
        },
      },
    });
  };
}