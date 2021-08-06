import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddShehadaPage } from '../add-shehada/add-shehada.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private modalController:ModalController) {}

  onEdit(){
    
  }
  onDelete(){

  }
  onAdd(){
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddShehadaPage,
      componentProps:{
       
      }
    });
    return await modal.present();
  }

}
