import { Component } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { ShehadatService } from 'src/app/services/shehadat.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements ViewWillEnter {

  counter = 0;
  constructor(private sheService: ShehadatService, private alert: AlertController) { }

  ionViewWillEnter() {
    this.counter = 0;
  }

  clearAll() {
    this.counter++;
    if (this.counter >= 20) {
      this.errorAlert();
    }
  }

  async errorAlert() {
    const modal = await this.alert.create({
      message: "Are you sure you want to clear all shehadat permentally!!!",
      header: 'Warning',
      cssClass: ['ion-color-danger'],
      buttons: [{
        text: 'No',
        role: 'Dismiss',
        handler: () => { this.counter = 0 }
      },
      {
        text: 'Yes',
        handler: () => { this.sheService.clearAll() }
      }]
    });

    return modal.present()
  }

}
