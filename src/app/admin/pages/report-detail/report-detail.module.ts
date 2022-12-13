import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportDetailComponent } from './report-detail.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';

const routes: Routes = [{ path: '', component: ReportDetailComponent }];

@NgModule({
  declarations: [ReportDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    ReportDetailContentModule,
  ],
})
export class ReportDetailModule {}
