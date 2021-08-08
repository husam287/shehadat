import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';
import { ShehadaDetailsPage } from '../shehada-details/shehada-details.page';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.page.html',
  styleUrls: ['./day-details.page.scss'],
})
export class DayDetailsPage implements ViewWillEnter {
  @Input('day') day: string;
  shehadat: Shehada[];
  constructor(private modalController: ModalController, private shehadaService: ShehadatService, private router:Router) { }


  async ionViewWillEnter() {
    this.shehadat = await this.shehadaService.getAllFromADay(new Date(this.day))
    console.log(this.shehadat)
  }

  onClose() {
    this.modalController.dismiss()
  }
  
  onClick(id){
    this.presentModal(id).then()
  }

  private async presentModal(id) {
    const modal = await this.modalController.create({
      component: ShehadaDetailsPage,
      componentProps: {
        id,
        type:'modal',
      }
    });
    return modal.present()
  }

}
