import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddShehadaPage } from './add-shehada.page';

const routes: Routes = [
  {
    path: '',
    component: AddShehadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddShehadaPageRoutingModule {}
