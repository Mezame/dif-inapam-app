import { Injectable } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { Order } from '@shared/types/order.type';
import { map, Observable } from 'rxjs';

@Injectable()
export class SortReportsService {
  private orderedReports$!: Observable<Report[]>;
  private orderFn!: (a: Report, b: Report) => number;

  constructor() {}

  sortReportsByDate(
    documents: Observable<Report[]>,
    order: Order
  ): Observable<Report[]> {
    if (order == 'asc') {
      this.orderFn = (a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      };
    }

    if (order == 'des') {
      this.orderFn = (a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      };
    }

    this.orderedReports$ = documents.pipe(
      map((documents) => {
        return documents.sort(this.orderFn);
      })
    );

    return this.orderedReports$;
  }
}
