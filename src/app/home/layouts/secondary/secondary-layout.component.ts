import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary-layout.component.html',
  styleUrls: ['./secondary-layout.component.scss'],
})
export class SecondaryLayoutComponent {
  @Input('toolbar-title') toolbarTitle?: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;

  @Input('toolbar-menu') toolbarMenu?: boolean;

  @Input('data') data?: { cardCode$?: Observable<string> };

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: string;
  }>();

  deleteDocumentAction(cardCode: string, action = 'deleteDocument') {
    this.actionEvent.emit({ action, data: cardCode });
  }
}
