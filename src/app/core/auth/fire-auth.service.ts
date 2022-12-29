import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Injectable()
export class FireAuthService {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  isAdmin$: Observable<boolean>;

  constructor(private fireAuth: Auth) {
    this.isLoggedIn$ = authState(this.fireAuth).pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.isAdmin$ = authState(this.fireAuth).pipe(
      switchMap(async (user) => {
        const idTokenResult = await user?.getIdTokenResult();

        return idTokenResult?.claims['role'] == 'admin' ? true : false;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const userCredential$ = from(
      signInWithEmailAndPassword(this.fireAuth, email, password)
    ).pipe(
      map((userCredential) => {
        if (userCredential) {
          return {
            username: userCredential.user.displayName,
            email: userCredential.user.email,
          };
        } else {
          throw new Error('could not login');
        }
      })
    );

    return userCredential$.pipe(
      take(1),
      tap((user) => {
        if (user) {
          console.log(`logged in user w/ email=${user.email}`);
        }
      }),
      catchError(this.handleError<any>('FireAuthService', 'login'))
    );
  }

  logout(): Observable<boolean> {
    const res$ = from(signOut(this.fireAuth)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          throw new Error('could not logout');
        }
      })
    );

    return res$.pipe(
      take(1),
      tap((_) => {
        console.log(`logged out successfully`);
      }),
      catchError(this.handleError<boolean>('FireAuthService', 'logout'))
    );
  }

  private handleError<T>(
    serviceName = '',
    operation = 'operation',
    result = {} as T
  ) {
    return (error: any): Observable<T> => {
      console.log(`${serviceName}: ${operation} failed: ${error.message}`);

      return of(result);
    };
  }
}
