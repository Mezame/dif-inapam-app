import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'oficios',
        loadChildren: () =>
          import(
            './templates/document-list/document-list-template.module'
          ).then((m) => m.DocumentListTemplateModule),
      },
      {
        path: 'oficio/folio',
        loadChildren: () =>
          import(
            './templates/document-detail/document-detail-template.module'
          ).then((m) => m.DocumentDetailTemplateModule),
      },
      {
        path: 'oficio/folio/editar',
        loadChildren: () =>
          import(
            './templates/document-edit/document-edit-template.module'
          ).then((m) => m.DocumentEditTemplateModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import(
            './templates/latest-report-detail/latest-report-detail-template.module'
          ).then((m) => m.LatestReportDetailTemplateModule),
      },
      {
        path: 'reportes-anteriores',
        loadChildren: () =>
          import(
            './templates/previous-report-list/previous-report-list-template.module'
          ).then((m) => m.PreviousReportListTemplateModule),
      },
      {
        path: 'asistentes',
        loadChildren: () =>
          import(
            './templates/assistant-list/assistant-list-template.module'
          ).then((m) => m.AssistantListTemplateModule),
      },
      {
        path: 'crear-asistente',
        loadChildren: () =>
          import(
            './templates/assistant-create-edit/assistant-create-edit-template.module'
          ).then((m) => m.AssistantCreateEditTemplateModule),
      },
      {
        path: 'asistente/id/editar',
        loadChildren: () =>
          import(
            './templates/assistant-create-edit/assistant-create-edit-template.module'
          ).then((m) => m.AssistantCreateEditTemplateModule),
      },
      {
        path: '',
        redirectTo: 'oficios',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HomeRoutingModule {}