import { Router } from '@angular/router';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';

let isPatchEnable = true;

export function whenNoReportExistPatch(
  reportStoreService: ReportStoreService,
  router: Router
) {
  if (!isPatchEnable) return;

  const reports = reportStoreService.getReportsValue();

  if (!reports[0]?.cardsStats) {
    router.navigate(['/home/oficios']);
  }
}
