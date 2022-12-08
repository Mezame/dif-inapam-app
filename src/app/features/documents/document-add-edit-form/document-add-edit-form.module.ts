import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DocumentAddEditFormComponent } from './document-add-edit-form.component';
import { InputFileImageModule } from '@shared/components/input-file-image/input-file-image.module';
import { SingleErrorPipeModule } from '@shared/pipes/single-form-error/single-error.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DocumentAddEditFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputFileImageModule,
    SingleErrorPipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [DocumentAddEditFormComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }],
})
export class DocumentAddEditFormModule {}
