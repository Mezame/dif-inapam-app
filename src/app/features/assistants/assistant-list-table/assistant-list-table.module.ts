import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantListTableComponent } from './assistant-list-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AssistantListTableComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  exports: [AssistantListTableComponent],
})
export class AssistantListTableModule {}
