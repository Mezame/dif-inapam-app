import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentAddEditFormModule } from '@features/documents/document-add-edit-form/document-add-edit-form.module';
import { AddDocumentsService } from '@features/documents/services/firestore/add-documents.service';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/firestore/store/document-store.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentAddComponent } from './document-add.component';

const routes: Routes = [{ path: '', component: DocumentAddComponent }];

@NgModule({
  declarations: [DocumentAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentAddEditFormModule,
  ],
  providers: [AddDocumentsService, DocumentStoreService, GetDocumentsService],
})
export class DocumentAddModule {}
