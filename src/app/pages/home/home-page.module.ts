import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { PrimaryLayoutModule } from './layouts/primary/primary-layout.module';
import { SecondaryLayoutModule } from './layouts/secondary/secondary-layout.module';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimaryLayoutModule,
    SecondaryLayoutModule,
  ],
})
export class HomePageModule {}
