import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderPage } from './calender.page';

const routes: Routes = [
  {
    path: '',
    component: CalenderPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderPageRoutingModule {}
