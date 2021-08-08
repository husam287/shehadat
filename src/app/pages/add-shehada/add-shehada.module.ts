import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShehadaPageRoutingModule } from './add-shehada-routing.module';

import { AddShehadaPage } from './add-shehada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShehadaPageRoutingModule,
  ],
  declarations: [AddShehadaPage]
})
export class AddShehadaPageModule {}
