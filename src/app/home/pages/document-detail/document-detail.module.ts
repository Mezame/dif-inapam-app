import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailComponent } from './document-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DocumentDetailContentModule } from '@features/documents/document-detail-content/document-detail-content.module';


const routes: Routes = [{ path: '', component: DocumentDetailComponent }];

@NgModule({
  declarations: [DocumentDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    DocumentDetailContentModule
  ],
})
export class DocumentDetailModule {}
