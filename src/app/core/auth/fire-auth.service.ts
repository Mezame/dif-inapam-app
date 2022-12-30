import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
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
import { User } from './user.interface';

@Injectable({ providedIn: 'root' })
export class FireAuthService {
  user$: Observable<User | null>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  isAdmin$: Observable<boolean>;

  //isEmailVerified$: Observable<boolean>;

  constructor(private fireAuth: Auth) {
    this.user$ = authState(this.fireAuth).pipe(
      map((user) => {
        return !!user ? { username: user.displayName!, email: user.email! } : null;
      })
    );

    this.isLoggedIn$ = authState(this.fireAuth).pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.isAdmin$ = authState(this.fireAuth).pipe(
      switchMap(async (user) => {
        //console.log(user);
        const idTokenResult = await user?.getIdTokenResult();

        return idTokenResult?.claims['role'] == 'admin' ? true : false;
      })
    );

    //this.isEmailVerified$ = authState(this.fireAuth).pipe(map((user) => !!user?.emailVerified));
  }

  signIn(email: string, password: string): Observable<User> {
    const userCredential$ = from(
      signInWithEmailAndPassword(this.fireAuth, email, password)
    ).pipe(
      map((userCredential) => {
        if (userCredential) {
          const user = {
            username: userCredential.user.displayName,
            email: userCredential.user.email,
            //emailVerified: userCredential.user.emailVerified,
          };

          return user as User;
        } else {
          throw new Error('could not signed in');
        }
      })
    );

    return userCredential$.pipe(
      take(1),
      tap((user) => {
        if (user) {
          console.log(`signed in user w/ email=${user.email}`);
        }
      }),
      catchError(this.handleError<User>('FireAuthService', 'signIn'))
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
        console.log(`signed out successfully`);
      }),
      catchError(this.handleError<boolean>('FireAuthService', 'signOut'))
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
            throw new Error('could not update password');
          }
        })
      );
    }

    return res$.pipe(
      take(1),
      tap((_) => {
        console.log(`updated password successfully`);
      }),
      catchError(this.handleError<boolean>('FireAuthService', 'updatePassword'))
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
