import { Component, Input } from '@angular/core';

interface ToolbarButton {
  text: string;
  icon?: string;
}

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary.layout.html',
  styleUrls: ['./primary.layout.sass']
})
export class PrimaryLayout {
  @Input('toolbar-title') toolbarTitle!: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;
}
