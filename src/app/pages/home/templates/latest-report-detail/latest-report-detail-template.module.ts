import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LatestReportDetailTemplate } from './latest-report-detail.template';

const routes: Routes = [{ path: '', component: LatestReportDetailTemplate }];

@NgModule({
  declarations: [LatestReportDetailTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LatestReportDetailTemplateModule {}
