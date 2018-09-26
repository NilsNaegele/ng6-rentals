import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCase'
})
export class UpperCasePipe implements PipeTransform {

  transform(value: string): string {
    value = value.trim();
    if (value) {
      return value.toUpperCase();
    }
  }
}
