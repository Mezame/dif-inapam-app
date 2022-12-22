import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssistantAddFormModule } from '@features/assistants/assistant-add-form/assistant-add-form.module';
import { AddAssistantsService } from '@features/assistants/services/firestore/add-assistants.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { AssistantAddComponent } from './assistant-add.component';

const routes: Routes = [{ path: '', component: AssistantAddComponent }];

@NgModule({
  declarations: [AssistantAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    AssistantAddFormModule,
  ],
  providers: [AddAssistantsService],
})
export class AssistantAddModule {}
