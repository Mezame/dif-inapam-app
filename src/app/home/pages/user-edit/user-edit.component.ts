import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup<{
    password: FormControl<string | null>;
  }>;
  user$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private fireAuthService: FireAuthService
  ) {
    this.user$ = this.fireAuthService.user$;
  }

  get passwordCtrl() {
    return this.userForm.controls['password'];
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    const password = this.passwordCtrl.value;

    if (password) {
      this.fireAuthService.updatePassword(password).subscribe((res) => {
        if (res) {
        }
      });
    }
  }
}
