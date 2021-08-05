import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { DayDetailsPage } from '../day-details/day-details.page';

@Component({
  selector: 'app-calender',
  templateUrl: 'calender.page.html',
  styleUrls: ['calender.page.scss']
})
export class CalenderPage {
  dateList: string[] = ['2021-08-08', '2021-08-17', '2021-08-06', '2021-08-11',];
  type: 'string';

  options: CalendarComponentOptions = {
    pickMode: 'multi',
  };
  constructor(public modalController: ModalController) {}

  getLeftDays(day: string) {
    let targetDate = new Date(day);
    let todayDate = new Date(Date.now());
    let timeMS = <any>targetDate - <any>todayDate;
    return Math.ceil(timeMS / (1000 * 60 * 60 * 24))
  }

  onclick($event){
    let s:HTMLElement = $event.path[1];
    let isActive = s.classList.contains('on-selected');
    let selectedDay = s.getAttribute('aria-label');
    if(isActive && selectedDay){
      this.presentModal(selectedDay);
    }
  }

  async presentModal(day:string) {
    const modal = await this.modalController.create({
      component: DayDetailsPage,
      componentProps:{
        day: day
      }
      
    });
    return await modal.present();
  }



}
