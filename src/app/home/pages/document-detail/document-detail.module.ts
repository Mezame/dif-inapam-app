import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentDetailComponent } from './document-detail.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentDetailContentModule } from '@features/documents/document-detail-content/document-detail-content.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';

const routes: Routes = [{ path: '', component: DocumentDetailComponent }];

@NgModule({
  declarations: [DocumentDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentDetailContentModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [DocumentStoreService, GetDocumentsService],
})
export class DocumentDetailModule {}
