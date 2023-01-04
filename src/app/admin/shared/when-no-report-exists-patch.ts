import { Router } from '@angular/router';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';
import { filter, take } from 'rxjs';

let isPatchEnable = true;

export function whenNoReportExistPatch(
  reportStoreService: ReportStoreService,
  router: Router
) {
  if (!isPatchEnable) return;

  reportStoreService
    .getReports()
    .pipe(
      filter((reports) => reports.length > 0),
      take(1)
    )
    .subscribe((reports) => {
      if (reports.length < 1) {
        router.navigate(['/home/oficios']);
      }
    });
}
