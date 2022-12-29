import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLoginComponent } from './custom-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomLoginComponent],
  imports: [CommonModule, RouterModule],
  exports: [CustomLoginComponent],
})
export class CustomLoginModule {}
