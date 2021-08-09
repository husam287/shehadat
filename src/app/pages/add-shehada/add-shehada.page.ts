import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';

@Component({
  selector: 'app-add-shehada',
  templateUrl: './add-shehada.page.html',
  styleUrls: ['./add-shehada.page.scss'],
})
export class AddShehadaPage implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  initStartDate = new Date().toISOString()
  startDate: Date;
  endDate: Date;
  owner: string;

  constructor(private modalController: ModalController, private shehadaService: ShehadatService, private alert: AlertController) { }

  ngOnInit() { }

  onClose() {
    this.modalController.dismiss()
  }

  onSubmit(form: NgForm) {
    let shehada: Shehada = form.form.value;

    if (shehada.startDate > shehada.endDate) {
      this.errorAlertForDate()
      return;
    }
    shehada['daysOfProfits'] = this.getProfitDays(shehada.type, shehada.endDate)
    shehada['profitDates'] = this.fillDatesTillEnd(shehada.type,shehada.startDate,shehada.endDate)
    console.log(shehada.profitDates)
    this.shehadaService.add(form.form.value)
    this.onClose()
  }

  getProfitDays(type: '1' | '3', endDate: Date) {
    let day = new Date(endDate).getDate()
    let endDateMonth = new Date(endDate).getMonth() + 1;
    let daysOfProfits = [];
    let month = (type === '1') ? 1 : (endDateMonth % 3 === 0) ? 3 : (endDateMonth % 3);
    console.log(month)
    while (month <= 12) {
      daysOfProfits.push(`${day}/${month}`)
      if (type === '1')
        month++;
      else
        month += 3;
    }
    return daysOfProfits
  }

  fillDatesTillEnd(type: '1' | '3', startDate: Date, endDate: Date) {
    let output = [];
    let startMoment = moment(startDate).add(1, 'd');
    let endMoment = moment(endDate);
    while (startMoment.isBefore(endMoment)) {
      startMoment.add(+type,'M');
      output.push(startMoment.format('YYYY-MM-DD'))
    }
    output.pop();
    return [...output];
  }

  async errorAlertForDate() {
    const modal = await this.alert.create({
      message: 'Start date must be before end date!!',
      header: 'ERROR IN DATES',
      buttons: ['Cancel']
    });

    return modal.present()
  }


}
