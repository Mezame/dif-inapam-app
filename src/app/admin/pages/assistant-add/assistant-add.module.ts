import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AssistantAddComponent } from './assistant-add.component';

const routes: Routes = [{ path: '', component: AssistantAddComponent }];

@NgModule({
  declarations: [AssistantAddComponent],
  imports: [CommonModule],
})
export class AssistantAddModule {}
