import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailTemplate } from './document-detail.template';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DocumentDetailTemplate }];

@NgModule({
  declarations: [DocumentDetailTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DocumentDetailTemplateModule {}
