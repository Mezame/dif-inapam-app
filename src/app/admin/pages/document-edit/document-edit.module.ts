import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentEditComponent } from './document-edit.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentAddEditFormModule } from '@features/documents/document-add-edit-form/document-add-edit-form.module';

const routes: Routes = [{ path: '', component: DocumentEditComponent }];

@NgModule({
  declarations: [DocumentEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentAddEditFormModule,
  ],
})
export class DocumentEditModule {}
