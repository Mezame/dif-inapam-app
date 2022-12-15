import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Assistant } from '../assistant.interface';

@Component({
  selector: 'app-assistant-list-table',
  templateUrl: './assistant-list-table.component.html',
  styleUrls: ['./assistant-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantListTableComponent implements OnInit {
  displayedColumns!: string[];

  @Input('data') assistants$!: Observable<Assistant[]>;

  @Output('action') actionEvent = new EventEmitter<{
    action: string;
    data: string;
  }>();

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email', 'options'];
  }

  deleteAssistantAction(id: string, action = 'deleteAssistant') {
    this.actionEvent.emit({ action, data: id });
  }
}
