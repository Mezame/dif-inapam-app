import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailContentComponent } from './document-detail-content.component';
import { LocalDateModule } from '@shared/pipes/local-date.module';

@NgModule({
  declarations: [DocumentDetailContentComponent],
  imports: [CommonModule, LocalDateModule],
  exports: [DocumentDetailContentComponent],
})
export class DocumentDetailContentModule {}
