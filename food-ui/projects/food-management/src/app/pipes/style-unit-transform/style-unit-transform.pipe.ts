import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'styleUnit',
  standalone: true
})
export class StyleUnitTransformPipe implements PipeTransform {

  transform(value: number, unit = 'px'): unknown {
    return `${value}${unit}`;
  }

}
