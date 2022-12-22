import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentEditComponent } from './document-edit.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentAddEditFormModule } from '@features/documents/document-add-edit-form/document-add-edit-form.module';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';

const routes: Routes = [{ path: '', component: DocumentEditComponent }];

@NgModule({
  declarations: [DocumentEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentAddEditFormModule,
  ],
  providers: [
    DocumentStoreService,
    GetDocumentsService,
    UpdateDocumentsService,
  ],
})
export class DocumentEditModule {}
