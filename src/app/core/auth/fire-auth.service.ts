import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@angular/fire/auth';
import {
  FirebaseErrorHandlerService,
  HandleError,
} from '@core/error-handlers/firebase-error-handler.service';
import { LoggerService } from '@core/logger/logger.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
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
import { User } from './user.interface';

@Injectable({ providedIn: 'root' })
export class FireAuthService {
  private handleError: HandleError;

  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(
    private fireAuth: Auth,
    private firebaseErrorHandlerService: FirebaseErrorHandlerService,
    private alertsService: AlertsService,
    private loggerService: LoggerService
  ) {
    this.user$ = authState(this.fireAuth).pipe(
      map((user) => {
        return !!user
          ? { username: user.displayName!, email: user.email! }
          : null;
      })
    );

    this.isLoggedIn$ = authState(this.fireAuth).pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.isAdmin$ = authState(this.fireAuth).pipe(
      switchMap(async (user) => {
        const idTokenResult = await user?.getIdTokenResult();

        return idTokenResult?.claims['role'] == 'admin' ? true : false;
      })
    );

    this.handleError =
      this.firebaseErrorHandlerService.createHandleError('FireAuthService');
  }

  signIn(email: string, password: string): Observable<any> {
    const userCredential$ = from(
      signInWithEmailAndPassword(this.fireAuth, email, password)
    ).pipe(map((userCredential) => userCredential.user));

    return userCredential$.pipe(
      take(1),
      tap((user) => {
        if (user) {
          this.loggerService.info(
            `FireAuthService: signIn: signed in user w/ email=${user.email}`
          );
        }
      }),
      catchError(this.handleError<any>('signIn'))
    );
  }

  signOut(): Observable<boolean> {
    const res$ = from(signOut(this.fireAuth)).pipe(
      map((res) => {
        if (res == undefined) {
          return true;
        } else {
          throw new Error('could not signed out');
        }
      })
    );

    return res$.pipe(
      take(1),
      tap((_) => {
        this.loggerService.info(
          'FireAuthService: signOut: signed out successfully'
        );
      }),
      catchError(this.handleError<boolean>('signOut'))
    );
  }

  updatePassword(password: string): Observable<boolean> {
    const currentUser = this.fireAuth.currentUser;
    let res$: Observable<boolean> = of(false);

    if (currentUser) {
      res$ = from(updatePassword(currentUser, password)).pipe(
        map((res) => {
          if (res == undefined) {
            return true;
          } else {
            this.alertsService.setAlert(
              'No ha sido posible cambiar la contrase??a.'
            );

            throw new Error('could not update password');
          }
        })
      );
    }

    return res$.pipe(
      take(1),
      tap((_) => {
        this.loggerService.info(
          'FireAuthService: updatePassword: updated password successfully'
        );

        this.alertsService.setAlert('Se ha cambiado la contrase??a.');
      }),
      catchError(this.handleError<boolean>('updatePassword'))
    );
  }
}
