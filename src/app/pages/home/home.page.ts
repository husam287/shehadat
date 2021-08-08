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
  shehadat: Shehada[] = [];
  constructor(private modalController: ModalController, private shehadaService: ShehadatService) { }

  ionViewWillEnter() {
    this.shehadaService.getAll().then(shehadats => {
      this.shehadat = shehadats
    })
  }

  onEdit(id) {

  }

  onDelete(id) {

  }

  onAdd() {
    this.presentModal()
  }

  async onChange(segmentVal) {
    if(segmentVal==='all')
      segmentVal = null;
      
    let newShehadat = await this.shehadaService.getAll(segmentVal);
    this.shehadat = [...newShehadat];
  }

  getOwnerColor(owner: string) {
    let colorsClass = { me: 'success', sherif: 'danger', children: 'tertiary', teta: 'warning' };
    return colorsClass[owner];
  }

  getProfitDays(type: '1' | '3', startDate: Date) {
    let day = new Date(startDate).getDate()
    let daysOfProfits = [];
    let month = 1;
    while (month <= 12) {
      daysOfProfits.push(`${day}/${month}`)
      if (type === '1')
        month++;
      else
        month += 3;
    }
    return daysOfProfits
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
