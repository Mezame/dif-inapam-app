import { Component, Input } from '@angular/core';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary-layout.component.html',
  styleUrls: ['./secondary-layout.component.scss']
})
export class SecondaryLayoutComponent {
  @Input('toolbar-title') toolbarTitle!: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;

}
