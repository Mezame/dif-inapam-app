import { NgModule } from '@angular/core';
import { PrimaryLayoutModule } from './primary/primary-layout.module';
import { SecondaryLayoutModule } from './secondary/secondary-layout.module';

@NgModule({
  imports: [PrimaryLayoutModule, SecondaryLayoutModule],
  exports: [PrimaryLayoutModule, SecondaryLayoutModule],
})
export class LayoutsModule {}
