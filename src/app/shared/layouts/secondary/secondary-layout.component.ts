import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { map, Observable } from 'rxjs';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary-layout.component.html',
  styleUrls: ['./secondary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryLayoutComponent {
  isAdmin$: Observable<boolean>;
  isNotAdmin$: Observable<boolean>;

  isTabletScreen: boolean;
  isMediumScreen: boolean;
  sideNavMode!: MatDrawerMode;
  isSideNavOpened!: boolean;
  
  @Input('toolbar-title') toolbarTitle?: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;

  @Input('toolbar-menu') toolbarMenu?: boolean;

  @Input('toolbar-back-link') toolbarBackLink?: string | any[];

  constructor(
    private fireAuthService: FireAuthService,
    private router: Router
  ) {
    this.isAdmin$ = this.fireAuthService.isAdmin$;
    this.isNotAdmin$ = this.isAdmin$?.pipe(map((isAdmin) => !isAdmin));

    this.isTabletScreen = false;
    this.isMediumScreen = false;

    this.setSideNavMode();
  }

  setSideNavMode() {
    const windowInnerWidth = window.innerWidth;

    if (windowInnerWidth >= 768 && windowInnerWidth < 1279.98) {
      this.isTabletScreen = true;
      this.isMediumScreen = false;
    }

    if (windowInnerWidth > 1279.98) {
      this.isMediumScreen = true;
      this.isTabletScreen = false;
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
