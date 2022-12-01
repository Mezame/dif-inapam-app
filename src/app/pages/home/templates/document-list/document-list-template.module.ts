import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListTemplate } from './document-list.template';
import { PrimaryLayoutModule } from '../../layouts/primary/primary-layout.module';

@NgModule({
  declarations: [DocumentListTemplate],
  imports: [CommonModule, PrimaryLayoutModule],
  exports: [DocumentListTemplate],
})
export class DocumentListTemplateModule {}
