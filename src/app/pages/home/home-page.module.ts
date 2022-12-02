import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { DocumentListTemplateModule } from './templates/document-list/document-list-template.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeRoutingModule, DocumentListTemplateModule],
})
export class HomePageModule {}
