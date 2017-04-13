import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'reverseOrder'
})

@Injectable()
export class OrderFilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
    return items;
 }
}