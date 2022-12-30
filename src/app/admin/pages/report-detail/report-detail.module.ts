import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportDetailComponent } from './report-detail.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: ReportDetailComponent }];

@NgModule({
  declarations: [ReportDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    ReportDetailContentModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ReportDetailModule {}
