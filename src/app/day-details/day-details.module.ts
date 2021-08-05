import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DayDetailsPageRoutingModule } from './day-details-routing.module';

import { DayDetailsPage } from './day-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DayDetailsPageRoutingModule
  ],
  declarations: [DayDetailsPage]
})
export class DayDetailsPageModule {}
