import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
    if(!value) return [];
    if(!args) return value;
    //console.log(value);
    //args = args.toLowerCase();
    return args ? value.filter(item => item.level_depth === args) : value;
    //return value.filter( it => return it.level_depth === args;
    //}):value;
  }
}
