import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.page.html',
  styleUrls: ['./day-details.page.scss'],
})
export class DayDetailsPage implements OnInit {
  @Input('day') day:string;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }
  onClose(){
    this.modalController.dismiss()
  }

}
