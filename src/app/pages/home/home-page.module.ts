import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { PrimaryLayoutModule } from './layouts/primary/primary-layout.module';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimaryLayoutModule,
  ],
})
export class HomePageModule {}
