import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

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
