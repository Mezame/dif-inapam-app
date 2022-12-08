import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { documentsMock } from '../mocks/document.mock';
import { getOperationCodes } from '../utils/getOperationCodes';
import { DocumentFormValue } from './document-form-value.interface';
import { mexicanFederalStates } from '@shared/mexican-federal-states';
import { defaultErrorMessage } from '@shared/default-error-message';
import { documentDefaultFormValue, setDefaultDocumentFormValue } from './document-default-form-value';

@Component({
  selector: 'app-document-add-edit-form',
  templateUrl: './document-add-edit-form.component.html',
  styleUrls: ['./document-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAddEditFormComponent {
  operationCodesOptions = getOperationCodes(of(documentsMock));

  statesOptions = mexicanFederalStates;

  defaultFormValue = documentDefaultFormValue;

  defaultErrorMessage = defaultErrorMessage;

  documentForm = this.fb.group({
    createDate: [{ value: this.defaultFormValue.createDate, disabled: true }],
    cardCode: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    operationCode: ['', Validators.required],
    branchOffice: {
      value: this.defaultFormValue.branchOffice,
      disabled: true,
    },
    reviewDocument: {
      value: this.defaultFormValue.reviewDocument,
      disabled: true,
    },
    makeCard: { value: this.defaultFormValue.makeCard, disabled: true },
    fathersLastname: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ]*')],
    ],
    mothersLastname: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ]*')],
    ],
    name: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]*')],
    ],
    sex: ['', Validators.required],
    birthdate: [null, Validators.required],
    birthplace: ['Veracruz', Validators.required],
    curp: [
      '',
      [
        Validators.required,
        Validators.minLength(18),
        Validators.maxLength(18),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    maritalStatus: ['', Validators.required],
    imageBlob: null,
  });

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: {};
  }>();

  constructor(private fb: FormBuilder) {}

  get cardCodeCtrl() {
    return this.documentForm.controls['cardCode'];
  }

  get operationCodeCtrl() {
    return this.documentForm.controls['operationCode'];
  }

  get fathersLastnameCtrl() {
    return this.documentForm.controls['fathersLastname'];
  }

  get mothersLastnameCtrl() {
    return this.documentForm.controls['mothersLastname'];
  }

  get nameCtrl() {
    return this.documentForm.controls['name'];
  }

  get sexCtrl() {
    return this.documentForm.controls['sex'];
  }

  get birthdateCtrl() {
    return this.documentForm.controls['birthdate'];
  }

  get curpCtrl() {
    return this.documentForm.controls['curp'];
  }

  get maritalStatusCtrl() {
    return this.documentForm.controls['maritalStatus'];
  }

  onSubmit() {
    let documentFormValue: Partial<DocumentFormValue>;

    documentFormValue = setDefaultDocumentFormValue(this.documentForm.value);

    this.documentForm.reset();

    this.emitAddDocumentAction(documentFormValue);
  }

  emitAddDocumentAction(data: {}, action = 'addDocument') {
    this.actionEvent.emit({ action, data });
  }

  emitEditDocumentAction(data: {}, action = 'editDocument') {
    this.actionEvent.emit({ action, data });
  }
}
