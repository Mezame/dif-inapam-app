import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'page-not-found',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found-page.module').then(
        (m) => m.PageNotFoundPageModule
      ),
  },
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      malformedUriErrorHandler: (_error, UrlSerializer, _url) =>
        UrlSerializer.parse('page-not-found'),
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
