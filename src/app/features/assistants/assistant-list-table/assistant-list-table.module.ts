import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantListTableComponent } from './assistant-list-table.component';

@NgModule({
  declarations: [AssistantListTableComponent],
  imports: [CommonModule],
  exports: [AssistantListTableComponent],
})
export class AssistantListTableModule {}
