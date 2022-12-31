import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {
  AuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { DocumentDetailResolverService } from '@features/documents/services/resolvers/document-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
