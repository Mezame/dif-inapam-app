import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssistantCreateEditComponent } from './assistant-create-edit.component';

const routes: Routes = [{ path: '', component: AssistantCreateEditComponent }];

@NgModule({
  declarations: [AssistantCreateEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AssistantCreateEditModule {}
