import { Injectable } from '@angular/core';
import { Assistant } from '@features/assistants/assistant.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAssistantsService } from '../firestore/get-assistants.service';

@Injectable()
export class AssistantStoreService {
  private assistants$ = new BehaviorSubject<Assistant[]>([]);

  constructor(private getAssistantsService: GetAssistantsService) {}

  loadAssistants() {
    this.getAssistantsService.getAssistants().subscribe((assistants) => {
      this.assistants$.next(assistants);
    });
  }

  getAssistants(): Observable<Assistant[]> {
    this.assistants$.subscribe((assistants) => {
      if (assistants.length < 1) {
        this.loadAssistants();
      }
    });

    return this.assistants$;
  }
}
