import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailComponent } from './document-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DocumentDetailComponent }];

@NgModule({
  declarations: [DocumentDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DocumentDetailModule {}
