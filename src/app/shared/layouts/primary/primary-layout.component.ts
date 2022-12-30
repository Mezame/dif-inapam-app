import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { Observable } from 'rxjs';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {
  isAdmin$: Observable<boolean>;

  @Input('toolbar-title') toolbarTitle?: string;
  /*
  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;
  */
  constructor(private fireAuthService: FireAuthService) {
    this.isAdmin$ = this.fireAuthService.isAdmin$;
  }
}
