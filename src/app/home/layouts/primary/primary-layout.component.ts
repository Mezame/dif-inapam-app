import { Component, Input } from '@angular/core';

interface ToolbarButton {
  text: string;
  icon?: string;
}

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss']
})
export class PrimaryLayoutComponent {
  @Input('toolbar-title') toolbarTitle!: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;
}
