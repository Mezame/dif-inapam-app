import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolbarButton } from '../toolbar-button.interface';

@Component({
  selector: 'app-secondary-layout',
  templateUrl: './secondary-layout.component.html',
  styleUrls: ['./secondary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryLayoutComponent {
  parentPagePath!: string;
  cardCode!: string;

  constructor(route: ActivatedRoute) {
    const routeClone = route as any;
    const parentPage = routeClone.snapshot._urlSegment.segments[1].path;

    this.cardCode = route.snapshot.params['cardCode'];

    if (parentPage == 'oficios') this.parentPagePath = '/home/oficios';

    if (parentPage == 'reporte-mensual')
      this.parentPagePath = '/admin/reporte-mensual';

    if (parentPage == 'asistentes') this.parentPagePath = '/admin/asistentes';
  }

  @Input('toolbar-title') toolbarTitle?: string;

  @Input('toolbar-icon-button') toolbarIconButton?: string;

  @Input('toolbar-button') toolbarButton?: ToolbarButton;

  @Input('toolbar-menu') toolbarMenu?: boolean;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: string;
  }>();

  deleteDocumentAction(cardCode: string, action = 'deleteDocument') {
    this.actionEvent.emit({ action, data: cardCode });
  }
}
