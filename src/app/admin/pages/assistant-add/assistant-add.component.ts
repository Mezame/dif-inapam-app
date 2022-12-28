import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssistantFormValue } from '@features/assistants/assistant-add-form/assistant-form-value.interface';
import { Assistant } from '@features/assistants/assistant.interface';
import { AddAssistantsService } from '@features/assistants/services/firestore/add-assistants.service';

@Component({
  selector: 'app-assistant-add',
  templateUrl: './assistant-add.component.html',
  styleUrls: ['./assistant-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAddComponent {
  constructor(
    private addAssistantsService: AddAssistantsService,
    private router: Router
  ) {}

  getAssistantAction(event: { action: string; data: {} }) {
    if (event.action == 'addAssistant') {
      const formData = { ...event.data } as AssistantFormValue;

      const assistant = formData as Assistant;

      this.addAssistantsService.setAssistant(assistant).subscribe((docRef) => {
        if (docRef == true) {
          this.router.navigate(['/admin/asistentes']);
        }
      });
    }
  }
}
