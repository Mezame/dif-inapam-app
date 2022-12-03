import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentEditTemplate } from './document-edit.template';


const routes: Routes = [{ path: '', component: DocumentEditTemplate }];

@NgModule({
  declarations: [DocumentEditTemplate],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DocumentEditTemplateModule {}
