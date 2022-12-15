import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assistant } from '@features/assistants/assistant.interface';
import { assistantsMock } from '@mocks/assistant.mock';

@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantListComponent implements OnInit {
  assistants$!: Observable<Assistant[]>;

  ngOnInit(): void {
    this.assistants$ = of(assistantsMock);
  }

  getAssistantAction(event: { action: string; data: {} }) {
    if (event.action == 'deleteAssistant')
      console.log('Delete assistant', event.data);
  }
}
