import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SecondaryLayoutComponent } from './secondary-layout.component';

@NgModule({
  declarations: [SecondaryLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [SecondaryLayoutComponent],
})
export class SecondaryLayoutModule {}
