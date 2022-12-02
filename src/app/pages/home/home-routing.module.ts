import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListTemplate } from './templates/document-list/document-list.template';
import { DocumentDetailTemplate } from './templates/document-detail/document-detail.template';
import { DocumentEditTemplate } from './templates/document-edit/document-edit.template';
import { LatestReportDetailTemplate } from './templates/latest-report-detail/latest-report-detail.template';
import { PreviousReportListTemplate } from './templates/previous-report-list/previous-report-list.template';
import { AssistantListTemplate } from './templates/assistant-list/assistant-list.template';
import { AssistantCreateEditTemplate } from './templates/assistant-create-edit/assistant-create-edit.template';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'oficios',
        component: DocumentListTemplate,
      },
      {
        path: 'oficio/folio',
        component: DocumentDetailTemplate,
      },
      {
        path: 'oficio/folio/editar',
        component: DocumentEditTemplate,
      },
      {
        path: 'reportes',
        component: LatestReportDetailTemplate,
      },
      {
        path: 'reportes-anteriores',
        component: PreviousReportListTemplate,
      },
      {
        path: 'asistentes',
        component: AssistantListTemplate,
      },
      {
        path: 'crear-asistente',
        component: AssistantCreateEditTemplate,
      },
      {
        path: 'asistente/id/editar',
        component: AssistantCreateEditTemplate,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
