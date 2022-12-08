import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PrimaryLayoutModule } from '../shared/layouts/primary/primary-layout.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, PrimaryLayoutModule],
})
export class HomeModule {}
