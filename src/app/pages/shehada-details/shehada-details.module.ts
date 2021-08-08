import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShehadaDetailsPageRoutingModule } from './shehada-details-routing.module';

import { ShehadaDetailsPage } from './shehada-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShehadaDetailsPageRoutingModule
  ],
  declarations: [ShehadaDetailsPage]
})
export class ShehadaDetailsPageModule {}
