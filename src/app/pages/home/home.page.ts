import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';
import { AddShehadaPage } from '../add-shehada/add-shehada.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {
  shehadat:Shehada[] = [];
  constructor(private modalController: ModalController, private shehadaService: ShehadatService) { }

  ionViewWillEnter() {
    this.shehadat = this.shehadaService.getAll()
  }

  onEdit(id) {

  }
  onDelete(id) {

  }
  onAdd() {
    this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddShehadaPage,
      componentProps: {

      }
    });

    modal.onWillDismiss().then(res => {
      this.ionViewWillEnter()
    })

    return modal.present()
  }

}
