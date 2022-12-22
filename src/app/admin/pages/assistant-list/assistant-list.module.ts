import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssistantListTableModule } from '@features/assistants/assistant-list-table/assistant-list-table.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { AssistantListComponent } from './assistant-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AssistantStoreService } from '@features/assistants/services/assistant-store.service';
import { GetAssistantsService } from '@features/assistants/services/get-assistants.service';
import { DeleteAssistantsService } from '@features/assistants/services/delete-assistants.service';

const routes: Routes = [{ path: '', component: AssistantListComponent }];

@NgModule({
  declarations: [AssistantListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    AssistantListTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [AssistantStoreService, GetAssistantsService, DeleteAssistantsService],
})
export class AssistantListModule {}
