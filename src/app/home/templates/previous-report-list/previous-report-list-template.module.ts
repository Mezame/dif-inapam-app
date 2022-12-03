import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreviousReportListTemplate } from './previous-report-list.template';

const routes: Routes = [{ path: '', component: PreviousReportListTemplate }];

@NgModule({
  declarations: [PreviousReportListTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PreviousReportListTemplateModule {}
