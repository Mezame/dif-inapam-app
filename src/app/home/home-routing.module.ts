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
            './pages/document-list/document-list.module'
          ).then((m) => m.DocumentListModule),
      },
      {
        path: 'oficio/folio',
        loadChildren: () =>
          import(
            './pages/document-detail/document-detail.module'
          ).then((m) => m.DocumentDetailModule),
      },
      {
        path: 'oficio/folio/editar',
        loadChildren: () =>
          import(
            './pages/document-edit/document-edit.module'
          ).then((m) => m.DocumentEditModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import(
            './pages/latest-report-detail/latest-report-detail.module'
          ).then((m) => m.LatestReportDetailModule),
      },
      {
        path: 'reportes-anteriores',
        loadChildren: () =>
          import(
            './pages/previous-report-list/previous-report-list.module'
          ).then((m) => m.PreviousReportListModule),
      },
      {
        path: 'asistentes',
        loadChildren: () =>
          import(
            './pages/assistant-list/assistant-list.module'
          ).then((m) => m.AssistantListModule),
      },
      {
        path: 'crear-asistente',
        loadChildren: () =>
          import(
            './pages/assistant-create-edit/assistant-create-edit.module'
          ).then((m) => m.AssistantCreateEditModule),
      },
      {
        path: 'asistente/id/editar',
        loadChildren: () =>
          import(
            './pages/assistant-create-edit/assistant-create-edit.module'
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
