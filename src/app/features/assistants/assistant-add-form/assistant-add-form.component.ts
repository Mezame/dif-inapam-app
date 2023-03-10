import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defaultErrorMessage } from '@shared/utils/default-error-message';
import { AssistantFormValue } from './assistant-form-value.interface';

@Component({
  selector: 'app-assistant-add-form',
  templateUrl: './assistant-add-form.component.html',
  styleUrls: ['./assistant-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantAddFormComponent implements OnInit {
  defaultErrorMessage: any;
  isSubmitButtonDisabled = false;

  assistantForm!: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;

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
    this.isSubmitButtonDisabled = true;

    const assistantFormValue = this.assistantForm.value as AssistantFormValue;

    this.emitAddAssistantAction(assistantFormValue);

    setTimeout(() => {
      this.isSubmitButtonDisabled = false;
    }, 4000);
  }

  emitAddAssistantAction(data: {}, action = 'addAssistant') {
    this.actionEvent.emit({ action, data });
  }
}
