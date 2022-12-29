import { NgModule } from '@angular/core';
import { CustomLoginModule } from './custom-login/custom-login.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, CustomLoginModule],
})
export class LoginModule {}
