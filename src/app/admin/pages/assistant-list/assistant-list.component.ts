import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Assistant } from '@features/assistants/assistant.interface';
import { DeleteAssistantsService } from '@features/assistants/services/firestore/delete-assistants.service';
import { AssistantStoreService } from '@features/assistants/services/store/assistant-store.service';
import { map, Observable, tap } from 'rxjs';

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

      if (confirm('¿Confirmas eliminar asistente?') == true) {
        this.deleteAssistantsService.deleteAssistant(id).subscribe((res) => {
          if (res == true) {
            this.assistantStoreService.deleteAssistant(id);
          }
        });
      }
    }
  }
}
