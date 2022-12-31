import {
  ChangeDetectionStrategy,
  Component, Input
} from '@angular/core';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary-layout.component.html',
  styleUrls: ['./secondary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryLayoutComponent {
  @Input('toolbar-title') toolbarTitle?: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;

  @Input('toolbar-menu') toolbarMenu?: boolean;

  @Input('toolbar-back-link') toolbarBackLink?: string | any[];
  /*
  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: string;
  }>();

  deleteDocumentAction(cardCode: string, action = 'deleteDocument') {
    this.actionEvent.emit({ action, data: cardCode });
  }

  cancelCardAction(cardCode: string, action = 'cancelCard') {
    this.actionEvent.emit({ action, data: cardCode });
  }
  */
}
