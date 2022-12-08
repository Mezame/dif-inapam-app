import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentAddComponent } from './document-add.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentCreateEditFormModule } from '@features/documents/document-create-edit-form/document-create-edit-form.module';

const routes: Routes = [{ path: '', component: DocumentAddComponent }];

@NgModule({
  declarations: [DocumentAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentCreateEditFormModule,
  ],
})
export class DocumentAddModule {}
