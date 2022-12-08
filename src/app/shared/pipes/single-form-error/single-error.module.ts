import { NgModule } from '@angular/core';
import { SingleErrorPipe } from './single-error.pipe';

@NgModule({
  declarations: [SingleErrorPipe],
  exports: [SingleErrorPipe],
})
export class SingleErrorPipeModule {}
