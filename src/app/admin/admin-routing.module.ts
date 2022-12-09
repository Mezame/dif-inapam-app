import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'reportes',
        loadChildren: () =>
          import(
            './pages/latest-report-detail/latest-report-detail.module'
          ).then((m) => m.LatestReportDetailModule),
      },
      {
        path: 'reportes/reportes-anteriores',
        loadChildren: () =>
          import(
            './pages/previous-report-list/previous-report-list.module'
          ).then((m) => m.PreviousReportListModule),
      },
      {
        path: 'oficios/:cardCode/editar',
        loadChildren: () =>
          import('./pages/document-edit/document-edit.module').then(
            (m) => m.DocumentEditModule
          ),
      },
      {
        path: 'asistentes',
        loadChildren: () =>
          import('./pages/assistant-list/assistant-list.module').then(
            (m) => m.AssistantListModule
          ),
      },
      {
        path: 'asistentes/crear-asistente',
        loadChildren: () =>
          import(
            './pages/assistant-create-edit/assistant-create-edit.module'
          ).then((m) => m.AssistantCreateEditModule),
      },
      {
        path: 'asistentes/:id/editar',
        loadChildren: () =>
          import(
            './pages/assistant-create-edit/assistant-create-edit.module'
          ).then((m) => m.AssistantCreateEditModule),
      },
      {
        path: '',
        redirectTo: 'reportes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
