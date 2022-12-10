import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AssistantAddComponent } from './assistant-add.component';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { AssistantAddFormModule } from '@features/assistants/assistant-add-form/assistant-add-form.module';

const routes: Routes = [{ path: '', component: AssistantAddComponent }];

@NgModule({
  declarations: [AssistantAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    AssistantAddFormModule,
  ],
})
export class AssistantAddModule {}
