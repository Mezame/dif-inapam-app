import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LatestReportDetailComponent } from './latest-report-detail.component';

const routes: Routes = [{ path: '', component: LatestReportDetailComponent }];

@NgModule({
  declarations: [LatestReportDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LatestReportDetailModule {}
