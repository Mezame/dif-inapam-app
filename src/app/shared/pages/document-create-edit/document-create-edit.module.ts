import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentCreateEditComponent } from './document-create-edit.component';
import { SecondaryLayoutModule } from '../../../home/layouts/secondary/secondary-layout.module';
import { DocumentCreateEditFormModule } from '@features/documents/document-create-edit-form/document-create-edit-form.module';

const routes: Routes = [{ path: '', component: DocumentCreateEditComponent }];

@NgModule({
  declarations: [DocumentCreateEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentCreateEditFormModule,
  ],
})
export class DocumentCreateEditModule {}
