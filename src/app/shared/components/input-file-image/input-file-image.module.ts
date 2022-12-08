import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputFileImageComponent } from './input-file-image.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InputFileImageComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [InputFileImageComponent],
})
export class InputFileImageModule {}
