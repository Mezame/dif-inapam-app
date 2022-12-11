import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'reporte-mensual',
        loadChildren: () =>
          import(
            './pages/report-dashboard/report-dashboard.module'
          ).then((m) => m.ReportDashboardModule),
      },
      {
        path: 'reportes/reportes-anteriores',
        loadChildren: () =>
          import(
            './pages/report-list/report-list.module'
          ).then((m) => m.ReportListModule),
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
          import('./pages/assistant-add/assistant-add.module').then(
            (m) => m.AssistantAddModule
          ),
      },
      {
        path: 'asistentes/:id/editar',
        loadChildren: () =>
          import('./pages/assistant-edit/assistant-edit.module').then(
            (m) => m.AssistantEditModule
          ),
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
