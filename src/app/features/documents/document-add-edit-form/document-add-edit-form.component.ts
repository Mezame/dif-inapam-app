import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { documentsMock } from '@shared/mocks/document.mock';
import { getOperationCode } from '../utils/get-operation-code';
import { DocumentFormValue } from './document-form-value.interface';
import { mexicanFederalStates } from '@shared/utils/mexican-federal-states';
import { defaultErrorMessage } from '@shared/utils/default-error-message';
import {
  documentDefaultFormValue,
  setDefaultDocumentFormValue,
} from './document-default-form-value';
import { Document } from '../document.interface';

@Component({
  selector: 'app-document-add-edit-form',
  templateUrl: './document-add-edit-form.component.html',
  styleUrls: ['./document-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAddEditFormComponent implements OnInit {
  operationCodesOptions = getOperationCode(of(documentsMock));

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
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ]*')],
    ],
    mothersLastname: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ]*')],
    ],
    name: [
      '',
      [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')],
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
    imageObj: { url: null, blob: null },
  });

  @Input('data') document!: Document;

  @Input() action!: string;

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

  ngOnInit() {
    if (this.action == 'editDocument') {
      this.documentForm.patchValue({
        cardCode: this.document.cardCode,
        operationCode: this.document.operationCode,
        fathersLastname: this.document.fathersLastname,
        mothersLastname: this.document.mothersLastname,
        name: this.document.name,
        sex: this.document.sex,
        birthdate: new Date(this.document.birthdate) as any,
        birthplace: this.document.birthplace,
        curp: this.document.curp,
        maritalStatus: this.document.maritalStatus,
        imageObj: { url: this.document.imageUrl as any, blob: null },
      });

      this.documentForm.setControl(
        'createDate',
        this.fb.control(new Date(this.document.createDate), Validators.required)
      );

      this.documentForm.setControl(
        'reviewDocument',
        this.fb.control(this.document.reviewDocument, Validators.required)
      );

      this.documentForm.setControl(
        'makeCard',
        this.fb.control(this.document.makeCard, Validators.required)
      );
    }
  }

  onSubmit() {
    let documentFormValue: Partial<DocumentFormValue>;

    if (this.action == 'addDocument') {
      documentFormValue = setDefaultDocumentFormValue(this.documentForm.value);

      this.emitAddDocumentAction(documentFormValue);
    }

    if (this.action == 'editDocument') {
      documentFormValue = this.documentForm.value;

      this.emitEditDocumentAction(documentFormValue);
    }
  }

  emitAddDocumentAction(data: {}, action = 'addDocument') {
    this.actionEvent.emit({ action, data });
  }

  emitEditDocumentAction(data: {}, action = 'editDocument') {
    this.actionEvent.emit({ action, data });
  }
}
