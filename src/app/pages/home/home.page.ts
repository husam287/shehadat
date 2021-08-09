import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ViewWillEnter } from '@ionic/angular';
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
  segmentValue = null;
  constructor(private modalController: ModalController, private shehadaService: ShehadatService, private alert: AlertController) { }

  async ionViewWillEnter() {
    this.shehadat = await this.shehadaService.getAll(this.segmentValue);
  }

  onEdit(id) {

  }

  onDelete(id:string,event:any) {
    event.stopPropagation();
    this.deleteAlert(() => {
      this.shehadaService.remove(id);
      let deletedIndex = this.shehadat.findIndex(item => item.id === id);
      this.shehadat.splice(deletedIndex, 1);
    })
  }

  onAdd() {
    this.presentModal()
  }

  async onChange(segmentVal) {
    if (segmentVal === 'all')
      segmentVal = null;

    this.segmentValue = segmentVal;
    let newShehadat = await this.shehadaService.getAll(segmentVal);
    this.shehadat = [...newShehadat];
  }

  getOwnerColor(owner: string) {
    let colorsClass = { me: 'success', sherif: 'primary', children: 'danger', teta: 'warning' };
    return colorsClass[owner];
  }

  getProfitDays(type: '1' | '3', startDate: Date) {
    let day = new Date(startDate).getDate()
    let daysOfProfits = [];
    let month = 1;
    while (month <= 12) {
      daysOfProfits.push(`${day + 1}/${month}`)
      if (type === '1')
        month++;
      else
        month += 3;
    }
    return daysOfProfits
  }
  
  getLeftDays(day: Date) {
    let targetDate = new Date(day);
    let todayDate = new Date(Date.now());
    let timeMS = <any>targetDate - <any>todayDate;
    return Math.ceil(timeMS / (1000 * 60 * 60 * 24))
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

  async deleteAlert(deleteFunction) {
    const modal = await this.alert.create({
      message: 'Are you sure that you want to delete this item permentally',
      header: 'WARRNING',
      cssClass: ['alert-delete-button'],
      buttons: [
        {
          text: 'Yes, Delete!!',
          handler: deleteFunction,
          role:'Delete'
        },
        'Cancel'
      ]
    });

    return modal.present()
  }

}
