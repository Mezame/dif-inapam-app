import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategyService } from './shared/selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home-page.module').then((m) => m.HomePageModule),
    data: { preload: true },
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
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
