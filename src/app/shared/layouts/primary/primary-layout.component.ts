import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
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

  isTabletScreen!: boolean;
  isMediumScreen!: boolean;
  sideNavMode!: MatDrawerMode;
  isSideNavOpened!: boolean;

  @Input('toolbar-title') toolbarTitle?: string;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setSideNavMode();
  }

  constructor(
    private fireAuthService: FireAuthService,
    private router: Router
  ) {
    this.isAdmin$ = this.fireAuthService.isAdmin$;
    this.isNotAdmin$ = this.isAdmin$.pipe(map((isAdmin) => !isAdmin));

    this.setSideNavMode();
  }

  setSideNavMode() {
    const windowInnerWidth = window.innerWidth;

    this.isTabletScreen = false;
    this.isMediumScreen = false;

    if (windowInnerWidth >= 768 && windowInnerWidth < 1279.98) {
      this.isTabletScreen = true;
    }

    if (windowInnerWidth > 1279.98) {
      this.isMediumScreen = true;
    }

    if (this.isTabletScreen) {
      this.sideNavMode = 'over';
      this.isSideNavOpened = false;
    }

    if (this.isMediumScreen) {
      this.sideNavMode = 'side';
      this.isSideNavOpened = true;
    }
  }

  logOut() {
    this.fireAuthService.signOut().subscribe((res) => {
      if (res == true) {
        this.router.navigate(['/login']);
      }
    });
  }
}
