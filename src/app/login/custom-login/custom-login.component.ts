import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { EMPTY, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoginComponent implements OnInit, OnDestroy {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(map((u) => !!u))
        .subscribe((isLoggedIn) => {
          this.showLoginButton = !isLoggedIn;
          this.showLogoutButton = isLoggedIn;
        });
    }
  }

  ngOnInit(): void {
    this.user.subscribe(user => console.log(user));
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    try {
      const email = 'mezametranslations@gmail.com';
      const password = 'admin123';

      const user = await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
    signOut(this.auth);
  }
}
