import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentDetailContentComponent } from './document-detail-content.component';
import { LocalDatePipeModule } from '@shared/pipes/local-date/local-date.module';

@NgModule({
  declarations: [DocumentDetailContentComponent],
  imports: [CommonModule, LocalDatePipeModule],
  exports: [DocumentDetailContentComponent],
})
export class DocumentDetailContentModule {}
