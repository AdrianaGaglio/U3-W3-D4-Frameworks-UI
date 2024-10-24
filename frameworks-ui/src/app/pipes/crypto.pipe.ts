import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crypto',
})
export class CryptoPipe implements PipeTransform {
  transform(value: string): unknown {
    return '********';
  }
}
