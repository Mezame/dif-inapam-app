import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportDashboardComponent } from './report-dashboard.component';

const routes: Routes = [{ path: '', component: ReportDashboardComponent }];

@NgModule({
  declarations: [ReportDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReportDashboardModule {}
