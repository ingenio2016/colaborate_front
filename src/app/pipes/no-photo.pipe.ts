import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noPhoto'
})
export class NoPhotoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let noimage = "assets/images/no-photo.png";

    if( !value ){
      return noimage;
    }

    return ( value.length > 0 ) ? value[1].url : noimage;
  }

}
