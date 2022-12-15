import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class AssistantAddFormComponent implements OnInit {
  defaultErrorMessage: any;

  assistantForm!: FormGroup<any>;

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

  ngOnInit(): void {
    this.defaultErrorMessage = defaultErrorMessage;

    this.assistantForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const assistantFormValue = this.assistantForm.value as AssistantFormValue;

    this.emitAddAssistantAction(assistantFormValue);
  }

  emitAddAssistantAction(data: {}, action = 'addAssistant') {
    this.actionEvent.emit({ action, data });
  }
}
