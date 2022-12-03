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
            './templates/document-list/document-list.module'
          ).then((m) => m.DocumentListModule),
      },
      {
        path: 'oficio/folio',
        loadChildren: () =>
          import(
            './templates/document-detail/document-detail.module'
          ).then((m) => m.DocumentDetailModule),
      },
      {
        path: 'oficio/folio/editar',
        loadChildren: () =>
          import(
            './templates/document-edit/document-edit.module'
          ).then((m) => m.DocumentEditModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import(
            './templates/latest-report-detail/latest-report-detail.module'
          ).then((m) => m.LatestReportDetailModule),
      },
      {
        path: 'reportes-anteriores',
        loadChildren: () =>
          import(
            './templates/previous-report-list/previous-report-list.module'
          ).then((m) => m.PreviousReportListModule),
      },
      {
        path: 'asistentes',
        loadChildren: () =>
          import(
            './templates/assistant-list/assistant-list.module'
          ).then((m) => m.AssistantListModule),
      },
      {
        path: 'crear-asistente',
        loadChildren: () =>
          import(
            './templates/assistant-create-edit/assistant-create-edit.module'
          ).then((m) => m.AssistantCreateEditModule),
      },
      {
        path: 'asistente/id/editar',
        loadChildren: () =>
          import(
            './templates/assistant-create-edit/assistant-create-edit.module'
          ).then((m) => m.AssistantCreateEditModule),
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
