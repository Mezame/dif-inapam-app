import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssistantListComponent } from './assistant-list.component';

const routes: Routes = [{ path: '', component: AssistantListComponent }];

@NgModule({
  declarations: [AssistantListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AssistantListModule {}
