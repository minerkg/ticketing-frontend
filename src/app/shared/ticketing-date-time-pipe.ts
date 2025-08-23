import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketingDateTime'
})
export class TicketingDateTimePipe implements PipeTransform {

  transform(value: Date | string | number | undefined, showTime: boolean = true): string {
    if (!value) return '';

    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    if (showTime) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      formattedDate += ` ${hours}:${minutes}`;
    }

    return formattedDate;
  }

}
