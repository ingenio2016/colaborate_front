import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let men = "assets/images/man.png";
    let woman = "assets/images/woman.png";

    if( value == 'M' ){
      return value = men;
    }else{
      return value = woman;
    }

  }

}
