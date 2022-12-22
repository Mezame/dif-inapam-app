import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportListTableModule } from '@features/reports/report-list-table/report-list-table.module';
import { GetReportsService } from '@features/reports/services/firestore/get-reports.service';
import { ReportStoreService } from '@features/reports/services/firestore/report-store.service';
import { SortReportsService } from '@features/reports/services/sorts/sort-reports.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportListComponent } from './report-list.component';

const routes: Routes = [{ path: '', component: ReportListComponent }];

@NgModule({
  declarations: [ReportListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    ReportListTableModule,
  ],
  providers: [ReportStoreService, GetReportsService, SortReportsService],
})
export class ReportListModule {}
