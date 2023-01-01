import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { SelectivePreloadingStrategyService } from './core/selective-preloading-strategy.service';
import { User } from 'firebase/auth';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('login');
/*const redirectLoggedInToAdminOrHome = () =>
  pipe(
    customClaims,
    map((claims) =>
      claims.role == 'admin' ? 'admin/panel-reportes' : 'home/oficios'
    )
  );*/

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    data: { preload: true },
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin),
    data: { preload: false },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    ...canActivate(redirectUnauthorizedToLogin),
    data: { preload: false },
  },
  {
    path: 'page-not-found',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
    data: { preload: false },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
