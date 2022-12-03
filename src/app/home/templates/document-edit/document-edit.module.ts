import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentEditComponent } from './document-edit.component';


const routes: Routes = [{ path: '', component: DocumentEditComponent }];

@NgModule({
  declarations: [DocumentEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DocumentEditModule {}
