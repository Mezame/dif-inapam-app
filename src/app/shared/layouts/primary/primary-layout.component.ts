import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {
  @Input('toolbar-title') toolbarTitle!: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;
}
