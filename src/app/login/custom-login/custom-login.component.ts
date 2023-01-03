import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { Observable } from 'rxjs';

interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoginComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any>;

  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private fireAuthService: FireAuthService,
    private alertsService: AlertsService,
    private router: Router
  ) {
    this.isAdmin$ = this.fireAuthService.isAdmin$;
    this.isLoggedIn$ = this.fireAuthService.isLoggedIn$;
    this.user$ = this.fireAuthService.user$;
  }

  get emailCtrl() {
    return this.loginForm.controls['email'];
  }

  get passwordCtrl() {
    return this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.emailCtrl.setValue('mezametranslations@gmail.com');
    this.passwordCtrl.setValue('admin123');
  }

  onSubmit() {
    const loginFormValue = this.loginForm.value as LoginFormValue;
    const email = loginFormValue.email;
    const password = loginFormValue.password;

    this.logIn(email, password);
  }

  logIn(email: string, password: string) {
    this.fireAuthService.signIn(email, password).subscribe(async (user) => {
      if (user.email) {
        const idTokenResult = await user?.getIdTokenResult();

        const isAdmin = idTokenResult?.claims['role'] == 'admin';

        if (isAdmin) {
          this.router.navigate(['/admin/panel-reportes']);
        } else {
          this.router.navigate(['/home/oficios']);
        }
      } else {
        this.alertsService.setAlert(
          'No ha sido posible iniciar sesión. Verifica que los datos sean correctos.'
        );
      }
    });
  }
}
