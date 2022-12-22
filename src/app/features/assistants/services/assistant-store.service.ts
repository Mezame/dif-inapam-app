import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assistant } from '../assistant.interface';
import { GetAssistantsService } from './get-assistants.service';

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