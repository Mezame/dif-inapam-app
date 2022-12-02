import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssistantListTemplate } from './assistant-list.template';

const routes: Routes = [{ path: '', component: AssistantListTemplate }];


@NgModule({
  declarations: [AssistantListTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AssistantListTemplateModule {}
