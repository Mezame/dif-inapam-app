import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportListComponent } from './report-list.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportListTableModule } from '@features/reports/report-list-table/report-list-table.module';

const routes: Routes = [{ path: '', component: ReportListComponent }];

@NgModule({
  declarations: [ReportListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    ReportListTableModule,
  ],
})
export class ReportListModule {}
