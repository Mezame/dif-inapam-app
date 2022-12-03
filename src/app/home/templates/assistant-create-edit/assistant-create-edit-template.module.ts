import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssistantCreateEditTemplate } from './assistant-create-edit.template';

const routes: Routes = [{ path: '', component: AssistantCreateEditTemplate }];

@NgModule({
  declarations: [AssistantCreateEditTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AssistantCreateEditTemplateModule {}
