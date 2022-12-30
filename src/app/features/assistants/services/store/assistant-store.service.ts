import { Injectable } from '@angular/core';
import { Assistant } from '@features/assistants/assistant.interface';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { GetAssistantsService } from '../firestore/get-assistants.service';

@Injectable({
  providedIn: 'root',
})
export class AssistantStoreService {
  private assistants$ = new BehaviorSubject<Assistant[]>([]);

  constructor(private getAssistantsService: GetAssistantsService) {}

  loadAssistants() {
    this.getAssistantsService.getAssistants().subscribe((assistants) => {
      if (assistants?.length > 0) {
        this.assistants$.next(assistants);
      }
    });
  }

  getAssistants(): Observable<Assistant[]> {
    const done = false;
    this.assistants$.pipe(take(2)).subscribe((assistants) => {
      if (assistants.length < 1) {
        this.loadAssistants();
      }
    });

    return this.assistants$;
  }

  deleteAssistant(id: string) {
    const assistants$ = this.getAssistants();

    assistants$.pipe(take(1)).subscribe((assistants) => {
      if (assistants.length == 1 && assistants[0].metadata.id == id) {
        this.assistants$.next([]);
      }
    });
  }
}
