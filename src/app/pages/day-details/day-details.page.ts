import { Component, Input } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import * as moment from 'moment';
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
  constructor(private modalController: ModalController, private toastController:ToastController, private shehadaService: ShehadatService, private alert: AlertController, private actionSheetController: ActionSheetController) { }


  async ionViewWillEnter() {
    this.shehadat = await this.shehadaService.getAllFromADay(this.day)
    console.log(this.shehadat)
  }

  onClose() {
    this.modalController.dismiss()
  }

  onClick(id) {
    this.presentModal(id).then()
  }

  calcTotalProfit() {
    let sum = 0;
    this.shehadat.forEach(item => {
      if (item.type === '1') {
        sum += +(((item?.money * (item?.profit / 100)) / 12).toFixed(2));
      } else {
        sum += +(((item?.money * (item?.profit / 100)) / 4).toFixed(2));
      }
    })
    return sum;
  }

  withdraw() {
    this.presentActionSheet();
  }
  
  private deleteCurrentDay(){
    this.shehadat.forEach(element=>{
      let index = element.profitDates.indexOf(this.day);
      element.profitDates.splice(index,1);
      this.shehadaService.edit(element.id, element);
    })
    this.presentToast();
    this.shehadat = [];
  }

  private async deleteAllPrevious(){
    let shehadat:Shehada[] = await this.shehadaService.getAll();
    shehadat.forEach(element=>{
      element.profitDates = element.profitDates.filter(element=>moment(element).isAfter(moment(this.day)))
      this.shehadaService.edit(element.id, element);
    })
    this.presentToast();
    this.shehadat = [];
  }

  private async presentModal(id) {
    const modal = await this.modalController.create({
      component: ShehadaDetailsPage,
      componentProps: {
        id,
        type: 'modal',
      }
    });
    return modal.present()
  }

  private async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Withdraw options',
      buttons: [{
        text: 'Withdraw this day only',
        icon: 'remove-outline',
        handler: () => {
          this.withdrawAlert('WITHDRAW ONE DAY!!', ()=>{this.deleteCurrentDay()})
        }
      }, {
        text: 'Withdraw all previous',
        icon: 'reorder-four-outline',
        handler: () => {
          this.withdrawAlert('WITHDRAW ALL PREVIOUS DAYS!!', ()=>{this.deleteAllPrevious()})
        }
      },
      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'close'
      }]
    });
    await actionSheet.present();
  }


  private async withdrawAlert(header, deleteFunction) {
    const modal = await this.alert.create({
      message: 'Are you sure that you want to withdraw?',
      header: header,
      buttons: [
        {
          text: 'Yes',
          handler: deleteFunction,
          role: 'success'
        },
        'Cancel'
      ]
    });
    await modal.present()
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'Withdraw successfully',
      duration: 1500,
      color:'success'
    });
    toast.present();
  }

}
