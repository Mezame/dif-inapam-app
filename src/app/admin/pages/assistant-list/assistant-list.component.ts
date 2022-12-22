import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Assistant } from '@features/assistants/assistant.interface';
import { AssistantStoreService } from '@features/assistants/services/assistant-store.service';
import { DeleteAssistantsService } from '@features/assistants/services/delete-assistants.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantListComponent implements OnInit {
  assistants$!: Observable<Assistant[]>;

  constructor(
    private assistantStoreService: AssistantStoreService,
    private deleteAssistantsService: DeleteAssistantsService
  ) {}

  ngOnInit(): void {
    this.assistants$ = this.assistantStoreService.getAssistants();
  }

  getAssistantAction(event: { action: string; data: {} }) {
    if (event.action == 'deleteAssistant') {
      const assistant = { ...event.data } as Assistant;

      const id = assistant.metadata.id;

      this.deleteAssistantsService.deleteAssistant(id).subscribe();
    }
  }
}
