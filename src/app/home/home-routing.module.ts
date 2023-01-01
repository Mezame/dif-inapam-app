import { NgModule } from '@angular/core';
import { AuthGuard, customClaims } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailResolverService } from '@features/documents/services/resolvers/document-detail-resolver.service';
import { map, pipe } from 'rxjs';

const assistantOnly = () =>
  pipe(
    customClaims,
    map((claims) => claims.role != 'admin')
  );

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'oficios',
        loadChildren: () =>
          import('./pages/document-list/document-list.module').then(
            (m) => m.DocumentListModule
          ),
      },
      {
        path: 'oficios/crear-oficio',
        loadChildren: () =>
          import('@shared/pages/document-add/document-add.module').then(
            (m) => m.DocumentAddModule
          ),
      },
      {
        path: 'oficios/:cardCode',
        loadChildren: () =>
          import('./pages/document-detail/document-detail.module').then(
            (m) => m.DocumentDetailModule
          ),
        resolve: {
          document: DocumentDetailResolverService,
        },
      },
      {
        path: 'mi-cuenta',
        loadChildren: () =>
          import('./pages/user-edit/user-edit.module').then(
            (m) => m.UserEditModule
          ),
        canActivate: [AuthGuard],
        data: { authGuardPipe: assistantOnly },
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
