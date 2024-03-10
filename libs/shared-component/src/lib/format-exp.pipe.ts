import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to format the expiration date.
 * Removes non-numeric characters, adds a slash after the second digit, and trims the resulting string.
 */
@Pipe({
  name: 'formatExp',
})
export class FormatExpPipe implements PipeTransform {
  /**
   * Transforms the input value by formatting the expiration date.
   * @param value - The input value to be transformed.
   * @returns The formatted expiration date.
   */
  transform(value: string): string {
    return value
      .replace(/[^0-9]/gi, '')
      .slice(0, 4)
      .replace(/(.{2})/, '$1/')
      .trim();
  }
}
