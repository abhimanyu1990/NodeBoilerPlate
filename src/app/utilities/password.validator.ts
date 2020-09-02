import { registerDecorator, ValidationOptions, ValidationArguments, IsBoolean } from 'class-validator';

export function IsMatchedRegex(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    console.log(object);
    console.log(propertyName);
    console.log(validationOptions);
    console.log(property);
    let strongRegex = new RegExp(property);

    registerDecorator({
      name: 'IsMatchedRegex',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && strongRegex.test(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

export default IsMatchedRegex;