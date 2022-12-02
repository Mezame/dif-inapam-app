import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';

import { DocumentListTemplateModule } from './templates/document-list/document-list-template.module';
import { DocumentDetailTemplateModule } from './templates/document-detail/document-detail-template.module';
import { DocumentEditTemplateModule } from './templates/document-edit/document-edit-template.module';
import { LatestReportDetailTemplateModule } from './templates/latest-report-detail/latest-report-detail-template.module';
import { PreviousReportListTemplateModule } from './templates/previous-report-list/previous-report-list-template.module';
import { AssistantCreateEditTemplateModule } from './templates/assistant-create-edit/assistant-create-edit-template.module';
import { AssistantListTemplateModule } from './templates/assistant-list/assistant-list-template.module';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DocumentListTemplateModule,
    DocumentDetailTemplateModule,
    DocumentEditTemplateModule,
    LatestReportDetailTemplateModule,
    PreviousReportListTemplateModule,
    AssistantListTemplateModule,
    AssistantCreateEditTemplateModule
  ],
})
export class HomePageModule {}
