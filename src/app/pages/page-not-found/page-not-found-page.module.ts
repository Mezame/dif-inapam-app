import { NgModule } from '@angular/core';
import { PageNotFoundPage } from './page-not-found.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: PageNotFoundPage }];

@NgModule({
  declarations: [PageNotFoundPage],
  imports: [RouterModule.forChild(routes)],
})
export class PageNotFoundPageModule {}
