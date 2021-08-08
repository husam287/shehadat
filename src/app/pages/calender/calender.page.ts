import { Component } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
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
  };
  constructor(public modalController: ModalController, private shehadat: ShehadatService) { }

  async ionViewWillEnter() {
    let shehadat = await this.shehadat.getAll()
    shehadat = shehadat.map(item => item['daysOfProfits']);
    let dates = [];
    shehadat.forEach(item => {
      dates = [...dates, ...item]
    })
    dates = dates.map(item=>{
      let day = item.split('/')[0];
      let month = item.split('/')[1];

      return `${ new Date().getFullYear() }-${ +month<=9? '0'+month:month }-${ +day<=9? '0'+day:day }`
    })

    dates = dates.filter(item=>{
      let today = new Date();
      let targetDate = new Date(item);
      return targetDate >= today
    })
    this.dateList = dates;
  }

  getLeftDays(day: string) {
    let targetDate = new Date(day);
    let todayDate = new Date(Date.now());
    let timeMS = <any>targetDate - <any>todayDate;
    return Math.ceil(timeMS / (1000 * 60 * 60 * 24))
  }

  onclick($event) {
    let s: HTMLElement = $event.path[1];
    let isActive = s.classList.contains('on-selected');
    let selectedDay = s.getAttribute('aria-label');
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
    return await modal.present();
  }



}
