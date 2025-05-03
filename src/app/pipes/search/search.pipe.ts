import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], term: string): any[] {
    if (!term) return data;
    const newData = data.filter((item) =>
      item.fullName.toLowerCase().includes(term.toLowerCase()),
    );

    return newData;
  }
}
