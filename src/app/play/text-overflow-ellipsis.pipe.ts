import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textOverflowEllipsis'
})
export class TextOverflowEllipsisPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let output = value;

    if(value.length > 100){
      output = value.substring(3, 130);
    }

    return output + '...';
  }

}
