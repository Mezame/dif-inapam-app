import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Report } from '@features/reports/report.interface';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { ReportStoreService } from '../store/report-store.service';

@Injectable({
  providedIn: 'any',
})
export class ReportDetailResolverService implements Resolve<Report> {
  constructor(
    private reportStoreService: ReportStoreService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<Report> {
    const id = route.paramMap.get('id');

    if (!id) return EMPTY;

    return this.reportStoreService.getReport(id).pipe(
      mergeMap((report) => {
        if (report) {
          return of(report);
        } else {
          this.router.navigate(['/admin/reportes']);

          return EMPTY;
        }
      })
    );
  }
}
