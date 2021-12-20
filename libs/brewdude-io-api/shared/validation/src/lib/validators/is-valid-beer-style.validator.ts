import { BeerStyle } from '@brewdude/global/types';
import { registerDecorator } from 'class-validator';

export function IsValidBeeryStyle(property: string) {
  return function (object: Record<string, string>, propertyName: string) {
    registerDecorator({
      name: 'isValidBeerStyle',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') {
            return false;
          }

          const matchedValue = Object.values(BeerStyle).find(
            (style) => style === value
          );

          return (
            Object.values(BeerStyle).find((style) => style === value) !== null
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
