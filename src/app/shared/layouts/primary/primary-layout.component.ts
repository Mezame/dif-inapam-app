import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {
  isAdmin$: Observable<boolean>;
  isNotAdmin$: Observable<boolean>;

  @Input('toolbar-title') toolbarTitle?: string;

  constructor(
    private fireAuthService: FireAuthService,
    private router: Router
  ) {
    this.isAdmin$ = this.fireAuthService.isAdmin$;
    this.isNotAdmin$ = this.isAdmin$.pipe(map((isAdmin) => !isAdmin));
  }

  logOut() {
    this.fireAuthService.signOut().subscribe((res) => {
      if (res == true) {
        this.router.navigate(['/login']);
      }
    });
  }
}
