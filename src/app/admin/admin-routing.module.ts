import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailResolverService } from '@features/documents/services/resolvers/document-detail-resolver.service';
import { ReportDetailResolverService } from '@features/reports/services/resolvers/report-detail-resolver.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'panel-reportes',
        loadChildren: () =>
          import('./pages/report-dashboard/report-dashboard.module').then(
            (m) => m.ReportDashboardModule
          ),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./pages/report-list/report-list.module').then(
            (m) => m.ReportListModule
          ),
      },
      {
        path: 'reportes/:id',
        loadChildren: () =>
          import('./pages/report-detail/report-detail.module').then(
            (m) => m.ReportDetailModule
          ),
          resolve: {
            report: ReportDetailResolverService,
          },
      },
      {
        path: 'oficios/:cardCode/editar',
        loadChildren: () =>
          import('./pages/document-edit/document-edit.module').then(
            (m) => m.DocumentEditModule
          ),
          resolve: {
            document: DocumentDetailResolverService,
          },
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
        path: '',
        redirectTo: 'panel-reportes',
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
