import { Component } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { ShehadatService } from 'src/app/services/shehadat.service';
import { DayDetailsPage } from '../day-details/day-details.page';

@Component({
  selector: 'app-calender',
  templateUrl: 'calender.page.html',
  styleUrls: ['calender.page.scss']
})
export class CalenderPage implements ViewWillEnter {
  dateList: string[] = [];
  type: 'string';
  
  beginingOfYear = new Date(new Date().getFullYear()+'-'+'01'+'-'+'01')

  options: CalendarComponentOptions = {
    pickMode: 'multi',
    showMonthPicker:false,
    from: new Date(moment().subtract(1,'y').format('YYYY-MM-DD')) //the last year
  };
  constructor(public modalController: ModalController, private shehadat: ShehadatService) { }

  async ionViewWillEnter() {
    let shehadat = await this.shehadat.getAll()
    shehadat = shehadat.map(item => item['profitDates']);
    let dates = [];
    shehadat.forEach(item => {
      dates = [...dates, ...item]
    })
    dates = [...new Set(dates)]
    dates = dates.sort()
    this.dateList = dates;
  }

  

  onclick($event) {
    let s: HTMLElement = $event.path[1];
    let isActive = s.classList.contains('on-selected');
    let selectedDay = s.getAttribute('aria-label');
    selectedDay = moment(new Date(selectedDay).toISOString()).format('YYYY-MM-DD')
    if (isActive && selectedDay) {
      this.presentModal(selectedDay);
    }
  }

  async presentModal(day: string) {
    const modal = await this.modalController.create({
      component: DayDetailsPage,
      componentProps: {
        day: day
      }
    });
    modal.onDidDismiss().then(()=>{
      this.ionViewWillEnter()
    })
    return await modal.present();
  }



}
