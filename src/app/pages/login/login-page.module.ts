import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: LoginPage }];

@NgModule({
  declarations: [LoginPage],
  imports: [RouterModule.forChild(routes)],
})
export class LoginPageModule {}
