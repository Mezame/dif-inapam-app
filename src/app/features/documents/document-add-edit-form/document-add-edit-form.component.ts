import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
import { mexicanFederalStates } from '@shared/utils/mexican-federal-states';
import { Document } from '../document.interface';
import {
  documentDefaultFormValue,
  formatDocumentFormValue,
  setDefaultDocumentFormValue,
} from './document-default-form-value';
import { DocumentFormValue } from './document-form-value.interface';

@Component({
  selector: 'app-document-add-edit-form',
  templateUrl: './document-add-edit-form.component.html',
  styleUrls: ['./document-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAddEditFormComponent implements OnInit {
  operationCodesOptions!: string[];

  statesOptions!: string[];

  defaultFormValue: any;

  defaultErrorMessage: any;

  documentForm!: FormGroup<{
    createDate: FormControl<Date | string | null>;
    cardCode: FormControl<string | null>;
    operationCode: FormControl<string | null>;
    branchOffice: FormControl<string | null>;
    reviewDocument: FormControl<string | null>;
    makeCard: FormControl<string | null>;
    fathersLastname: FormControl<string | null>;
    mothersLastname: FormControl<string | null>;
    name: FormControl<string | null>;
    sex: FormControl<string | null>;
    birthdate: FormControl<Date | string | null>;
    birthplace: FormControl<string | null>;
    curp: FormControl<string | null>;
    maritalStatus: FormControl<string | null>;
    imageObj: FormControl<{ url: string | null; blob: File | null } | null>;
  }>;

  @Input('data') document!: Document;

  @Input() action!: string;

  @Output() actionEvent = new EventEmitter<{
    action: string;
    data: any;
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
    this.operationCodesOptions = ['NUEVO REG', 'CANJE', 'REPOSICION'];

    this.statesOptions = mexicanFederalStates;

    this.defaultErrorMessage = defaultErrorMessage;

    this.defaultFormValue = documentDefaultFormValue;

    this.documentForm = this.fb.group({
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
    }) as FormGroup;

    if (this.action == 'editDocument') {
      this.documentForm.patchValue({
        cardCode: this.document.cardCode,
        operationCode: this.document.operationCode,
        fathersLastname: this.document.fathersLastname,
        mothersLastname: this.document.mothersLastname,
        name: this.document.name,
        sex: this.document.sex,
        birthdate: new Date(this.document.birthdate),
        birthplace: this.document.birthplace,
        curp: this.document.curp,
        maritalStatus: this.document.maritalStatus,
        imageObj: { url: this.document.imageUrl ?? null, blob: null },
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

      documentFormValue = formatDocumentFormValue(documentFormValue);

      this.emitAddDocumentAction(documentFormValue);
    }

    if (this.action == 'editDocument') {
      let hasImage = false;

      documentFormValue = this.documentForm.value;

      documentFormValue = formatDocumentFormValue(documentFormValue);

      if (this.document.imageUrl) {
        hasImage = true;
      }

      this.emitEditDocumentAction({ documentFormValue, hasImage });
    }
  }

  emitAddDocumentAction(data: {}, action = 'addDocument') {
    this.actionEvent.emit({ action, data });
  }

  emitEditDocumentAction(data: {}, action = 'editDocument') {
    this.actionEvent.emit({ action, data });
  }
}
