import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShehadaDetailsPage } from './shehada-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShehadaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShehadaDetailsPageRoutingModule {}
