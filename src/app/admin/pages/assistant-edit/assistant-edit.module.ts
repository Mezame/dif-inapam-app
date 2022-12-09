import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AssistantEditComponent } from './assistant-edit.component';

const routes: Routes = [{ path: '', component: AssistantEditComponent }];

@NgModule({
  declarations: [AssistantEditComponent],
  imports: [CommonModule],
})
export class AssistantEditModule {}
