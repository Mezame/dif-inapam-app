import { Injectable } from '@angular/core';
import { Assistant } from '@features/assistants/assistant.interface';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { GetAssistantsService } from '../firestore/get-assistants.service';

@Injectable({
  providedIn: 'root',
})
export class AssistantStoreService {
  private readonly assistants$ = new BehaviorSubject<Assistant[]>([]);

  constructor(private getAssistantsService: GetAssistantsService) {}

  loadAssistants() {
    this.getAssistantsService.getAssistants().subscribe((assistants) => {
      this.assistants$.next(assistants);
    });
  }

  getAssistants(): Observable<Assistant[]> {
    const assistants = this.assistants$.getValue();

    if (assistants.length < 1) {
      this.loadAssistants();
    }

    return this.assistants$;
  }

  addDocument(assistant: Assistant) {
    const assistants = this.assistants$.getValue() as ReadonlyArray<Assistant>;

    const newAssistants = [...assistants, assistant];

    this.assistants$.next(newAssistants);
  }

  deleteAssistant(id: string) {
    const assistants = this.assistants$.getValue() as ReadonlyArray<Assistant>;

    const index = assistants.findIndex(
      (assistant) => assistant.metadata.id == id
    );

    let newAssistants = [...assistants];

    newAssistants.splice(index, 1);

    this.assistants$.next(newAssistants);
  }
}
