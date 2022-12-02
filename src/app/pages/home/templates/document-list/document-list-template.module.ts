import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListTemplate } from './document-list.template';
import { PrimaryLayoutModule } from '../../layouts/primary/primary-layout.module';

const routes: Routes = [{ path: '', component: DocumentListTemplate }];

@NgModule({
  declarations: [DocumentListTemplate],
  imports: [CommonModule, RouterModule.forChild(routes), PrimaryLayoutModule],
  exports: [DocumentListTemplate],
})
export class DocumentListTemplateModule {}
