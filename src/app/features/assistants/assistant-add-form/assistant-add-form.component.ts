import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { defaultErrorMessage } from '@shared/utils/default-error-message';

interface AssistantFormValue {
  name: string;
  email: string;
}

@Component({
  selector: 'app-assistant-add-form',
  templateUrl: './assistant-add-form.component.html',
  styleUrls: ['./assistant-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAddFormComponent {
  defaultErrorMessage = defaultErrorMessage;

  assistantForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {};
  }>();

  constructor(private fb: FormBuilder) {}

  get nameCtrl() {
    return this.assistantForm.controls['name'];
  }

  get emailCtrl() {
    return this.assistantForm.controls['email'];
  }

  onSubmit() {
    const assistantFormValue = this.assistantForm.value as AssistantFormValue;

    this.emitAddAssistantAction(assistantFormValue);
  }

  emitAddAssistantAction(data: {}, action = 'addAssistant') {
    this.actionEvent.emit({ action, data });
  }
}
