import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentAddComponent } from './document-add.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentAddEditFormModule } from '@features/documents/document-add-edit-form/document-add-edit-form.module';

const routes: Routes = [{ path: '', component: DocumentAddComponent }];

@NgModule({
  declarations: [DocumentAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentAddEditFormModule,
  ],
})
export class DocumentAddModule {}
