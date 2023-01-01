import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { FireAuthService } from '../fire-auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private fireAuthService: FireAuthService,
    private router: Router
  ) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.redirectLoggedInToToMain();
  }

  private redirectLoggedInToToMain(): Observable<boolean | UrlTree> {
    return this.fireAuthService.isLoggedIn$.pipe(
      map((isLoggedIn) => (!isLoggedIn ? true : this.router.parseUrl('')))
    );
  }
}
