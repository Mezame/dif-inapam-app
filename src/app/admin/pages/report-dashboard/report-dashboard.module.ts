import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportDashboardComponent } from './report-dashboard.component';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: ReportDashboardComponent }];

@NgModule({
  declarations: [ReportDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ReportDetailContentModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ReportDashboardModule {}
